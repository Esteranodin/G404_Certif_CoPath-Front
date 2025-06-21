import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { adaptScenarioForDisplay } from '@/lib/adapters/scenarioAdapter';

export function useScenarioSearch() {
  const [searchParams, setSearchParams] = useState({
    search: '',
    page: 1,
    itemsPerPage: 20,
    sortBy: 'createdAt',
    sortOrder: 'DESC'
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['scenarios', 'search', searchParams],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SCENARIOS.SEARCH, {
        params: searchParams
      });
      return response.data;
    },
    keepPreviousData: true,
    select: (data) => {
      const scenarios = data?.member?.[0] || [];

      return {
        ...data,
        scenarios: scenarios.map((scenario) =>adaptScenarioForDisplay(scenario, []))
      };
    }
  });

  const scenarios = data?.scenarios || [];

  return {
    scenarios,
    totalItems: data?.totalItems || 0,
    pagination: data?.view || {},
    isLoading,
    error,
    searchParams,
    handleSearch: (searchText) => {
      setSearchParams(prev => ({
        ...prev,
        search: searchText,
        page: 1
      }));
    },
    handlePageChange: (newPage) => {
      setSearchParams(prev => ({
        ...prev,
        page: newPage
      }));
    },
    handleFilterChange: (filters) => {
      setSearchParams(prev => ({
        ...prev,
        ...filters,
        page: 1
      }));
    }
  };
}