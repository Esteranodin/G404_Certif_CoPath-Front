export default function DataStateHandler({ 
  loading, 
  error, 
  data = [],
  onRetry,
  loadingMessage = "Chargement en cours...",
  emptyMessage = "Aucune donnée disponible",
  className = "container px-4 py-8",
  children 
}) {
  // État de chargement
  if (loading) {
    return (
      <main className={className}>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-lg">🔄 {loadingMessage}</div>
        </div>
      </main>
    );
  }

  // État d'erreur
  if (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      (typeof error === "string" ? error : "Une erreur est survenue");

    return (
      <main className={className}>
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Erreur :</strong> {errorMessage}
          </div>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Réessayer
            </button>
          )}
        </div>
      </main>
    );
  }

  // État vide 
  if (data.length === 0) {
    return (
      <main className={className}>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{emptyMessage}</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              ↻ Actualiser
            </button>
          )}
        </div>
      </main>
    );
  }

  // État normal - affiche le contenu
  return (
    <main className={className}>
      {children}
    </main>
  );
}