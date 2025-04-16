"use client"

import * as React from "react"
import { cn } from "@/lib/utils/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props} />
  )
}

/**
 * Skeleton pour formulaires (login, register, etc.)
 */
function FormSkeleton({ 
  fields = 2,
  hasTitle = true,
  hasFooter = false,
  className = ""
}) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Titre */}
      {hasTitle && <Skeleton className="h-8 w-2/3 mx-auto mb-2" />}
      
      {/* Champs */}
      {Array(fields).fill().map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      
      {/* Bouton */}
      <Skeleton className="h-10 w-full mt-2" />
      
      {/* Footer */}
      {hasFooter && <Skeleton className="h-4 w-2/3 mx-auto mt-4" />}
    </div>
  );
}

/**
 * Skeleton pour cards
 */
function CardsSkeleton({ 
  count = 3,
  layout = "default", // default ou tablet
  className = ""
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {Array(count).fill().map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          {layout === "tablet" ? (
            <div className="flex gap-4">
              {/* Image côté */}
              <Skeleton className="h-[200px] w-[120px] rounded-md flex-shrink-0" />
              
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Image en haut */}
              <Skeleton className="h-40 w-full rounded-t-md" />
              <Skeleton className="h-6 w-3/4 mt-2" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton pour profil utilisateur
 */
function ProfileSkeleton({ className = "" }) {
  return (
    <div className={cn("w-full max-w-md space-y-6", className)}>
      {/* Avatar et infos principales */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[120px]" />
        </div>
      </div>
      
      {/* Formulaire de profil */}
      <FormSkeleton fields={2} />
      
      {/* Bouton changement mot de passe */}
      <Skeleton className="h-10 w-1/2 mt-4" />
    </div>
  );
}

/**
 * Skeleton pour tableau de bord
 */
function DashboardSkeleton({ className = "" }) {
  return (
    <div className={cn("container py-6 space-y-6", className)}>
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      
      {/* Cards */}
      <CardsSkeleton count={3} />
    </div>
  );
}

/**
 * Skeleton pour listes
 */
function ListSkeleton({ 
  rows = 5, 
  hasActions = true,
  className = "" 
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array(rows).fill().map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 border-b">
          <div className="flex-1">
            <Skeleton className="h-5 w-2/3 mb-1" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          {hasActions && (
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton pour authentification (login/register)
 */
function AuthSkeleton({ className = "" }) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md", className)}>
      <FormSkeleton fields={2} hasTitle={true} hasFooter={true} />
    </div>
  );
}

/**
 * Skeleton générique intelligent qui peut prendre différents aspects selon les props
 */
function SmartSkeleton({ 
  variant = "default",
  count = 1,
  rows = 5,
  fields = 2,
  hasTitle = true,
  hasFooter = false,
  hasActions = true,
  layout = "default",
  className = ""
}) {
  // Choix du composant approprié selon la variante
  switch(variant) {
    case "form":
      return <FormSkeleton fields={fields} hasTitle={hasTitle} hasFooter={hasFooter} className={className} />;
    case "cards":
      return <CardsSkeleton count={count} layout={layout} className={className} />;
    case "profile":
      return <ProfileSkeleton className={className} />;
    case "dashboard":
      return <DashboardSkeleton className={className} />;
    case "list":
      return <ListSkeleton rows={rows} hasActions={hasActions} className={className} />;
    case "auth":
      return <AuthSkeleton className={className} />;
    default:
      // Skeleton simple par défaut
      return <Skeleton className={cn("w-full h-10", className)} />;
  }
}

export {
  Skeleton,
  FormSkeleton,
  CardsSkeleton,
  ProfileSkeleton, 
  DashboardSkeleton,
  ListSkeleton,
  AuthSkeleton,
  SmartSkeleton
}
