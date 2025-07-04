export const useCategories = () => {
  return useAsyncData('categories', () =>
    $fetch('/api/category'),{ 
      server: false, 
      lazy: true,
      staleTime: 60 * 1000,
      transform: (data) => data || [] 
    })
}