export const useProfiles = () =>{
    return useAsyncData('profiles', () =>
    $fetch('/api/profiles'),{
        server: false,
        lazy: true,
        staleTime: 60 * 1000,
        transform: (data) => data || []
    })
} 