export const getMasterDataPayload = () => ({
    api_key: import.meta.env.VITE_APP_gAUTH_API_KEY,
    api_secret: import.meta.env.VITE_APP_API_SECRET,
    app_key: import.meta.env.VITE_APP_APP_KEY, 
    client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
});