"use client";

import { useUserRatings as useUserRatingsContext } from "@/context/UserRatingsContext";
import { userRatingService } from "@/lib/services/userRatingService";
import { LOG_MESSAGES } from '@/lib/config/messages';
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function useUserRatings() {
  const { userRatings, loading, refreshUserRatings } = useUserRatingsContext();
  const { user, isClient } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const getUserRating = (scenarioId) => {
    if (!user || !userRatings.length) {
      return null;
    }
    
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

      await refreshUserRatings();

      return updatedRating;
    } catch (error) {
      console.error(LOG_MESSAGES.DEBUG.RATING_ERROR, error);
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
      console.error(LOG_MESSAGES.DEBUG.RATING_DELETE_ERROR, error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    getUserRating,
    setUserRating,
    removeUserRating,
    loading,
    submitting,
    isClient
  };
}