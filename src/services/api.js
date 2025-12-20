// This reads the variable we defined in your .env file
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * A wrapper around the native fetch API.
 * It handles the base URL and standard headers automatically.
 */
export const apiClient = {
    get: async (endpoint, options = {}) => {
        return customFetch(endpoint, { ...options, method: 'GET' });
    },
    post: async (endpoint, body, options = {}) => {
        return customFetch(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },
    put: async (endpoint, body, options = {}) => {
        return customFetch(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },
    delete: async (endpoint, options = {}) => {
        return customFetch(endpoint, { ...options, method: 'DELETE' });
    }
};

/* Internal helper function */
async function customFetch(endpoint, options) {
    // Ensure we don't end up with double slashes //
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${cleanEndpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        // Add Authorization headers here later if you need them:
        // 'Authorization': `Bearer ${token}` 
    };

    const config =VF = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        
        // Handle 404/500 errors which fetch doesn't catch by default
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Return empty object for 204 No Content, otherwise JSON
        if (response.status === 204) return {};
        
        return await response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error; // Re-throw so the hook can catch it
    }
}