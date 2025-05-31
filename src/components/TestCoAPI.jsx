"use client";

import { useState } from 'react';
import apiClient from '@/lib/api/client';

export default function ApiTestPanel() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const quickTest = async (endpoint) => {
    try {
      setLoading(true);
      const response = await apiClient.get(endpoint);
      setResult({
        endpoint,
        success: true,
        count: response.data.member?.length || response.data.totalItems || 0,
        data: response.data
      });
    } catch (err) {
      setResult({
        endpoint,
        success: false,
        error: err.response?.status || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border max-w-sm">
      <h3 className="font-bold mb-3">🔧 API Test Panel</h3>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        {['/campaigns', '/scenarios', '/music', '/img_scenarios'].map(endpoint => (
          <button
            key={endpoint}
            onClick={() => quickTest(endpoint)}
            disabled={loading}
            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 disabled:opacity-50"
          >
            {endpoint.split('/')[1]}
          </button>
        ))}
      </div>

      {result && (
        <div className={`p-2 rounded text-xs ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <strong>{result.endpoint}:</strong> 
          {result.success ? ` ${result.count} items` : ` Error ${result.error}`}
        </div>
      )}
    </div>
  );
}