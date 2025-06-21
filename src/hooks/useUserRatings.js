"use client";

import { useUserRatingsContext } from "@/context/UserRatingsContext";
import { userRatingService } from "@/lib/services/userRatingService";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function useUserRatings() {
  const { userRatings, loading, refreshUserRatings } = useUserRatingsContext();
  const { user, isClient } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  /**
   * ✅ SIMPLIFIÉ : Utilise le DTO du service
   */
  const getUserRating = (scenarioId) => {
    if (!user || !userRatings.length) {
      return null;
    }
    
    // ✅ Utilise la méthode du service (DRY !)
    const rating = userRatingService.findByScenarioId(userRatings, scenarioId);
    return rating ? rating.score : null;
  };

  /**
   * Donner/Modifier une note
   */
  const setUserRating = async (scenarioId, score) => {
    if (!isClient || !user) {
      throw new Error("Veuillez vous connecter pour noter");
    }

    setSubmitting(true);
    try {
      const updatedRating = await userRatingService.setRating(scenarioId, score);
      
      // Recharger toutes les notes pour être sûr
      await refreshUserRatings();

      return updatedRating;
    } catch (error) {
      console.error('Erreur lors de la notation:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Supprimer une note
   */
  const removeUserRating = async (scenarioId) => {
    if (!isClient || !user) {
      throw new Error("Veuillez vous connecter");
    }

    setSubmitting(true);
    try {
      await userRatingService.removeRating(scenarioId);
      await refreshUserRatings();
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    getUserRating,
    setUserRating,
    loading,
    submitting,
    isClient
  };
}