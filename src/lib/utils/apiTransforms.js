export const apiTransforms = {
  /**
   * Convertit un ID en IRI Entity
   */
  toIRI: (resourceType, id) => `/api/${resourceType}/${id}/entity`,
  
  /**
   * Extrait l'ID depuis un IRI ou objet
   */
  extractId: (iriOrObject) => {
    if (!iriOrObject) return null;
    
    if (iriOrObject?.id) {
      return String(iriOrObject.id);
    }
    
    if (typeof iriOrObject === 'string') {
      const match = iriOrObject.match(/\/api\/\w+\/(\d+)(?:\/entity)?$/);
      return match ? match[1] : iriOrObject;
    }
    
    return String(iriOrObject);
  },

  /**
   * Normalise les données de favori depuis l'API
   */
  normalizeFavorite: (favorite) => ({
    id: apiTransforms.extractId(favorite.id || favorite),
    scenarioId: apiTransforms.extractId(favorite.scenario),
  }),

  /**
   * Normalise les données de rating depuis l'API
   */
  normalizeRating: (rating) => ({
    id: apiTransforms.extractId(rating.id || rating),
    scenarioId: apiTransforms.extractId(rating.scenario),
    score: rating.score,
  })
};