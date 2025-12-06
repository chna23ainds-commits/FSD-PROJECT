import React from 'react';

export const api = {
    async request(endpoint, options = {}) {
        const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return response.json();
    },

    auth: {
        signIn: (email, password) =>
            api.request('/auth/sign-in', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }),
        signUp: (email, password) =>
            api.request('/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }),
        signOut: () =>
            api.request('/auth/sign-out', { method: 'POST' }),
    },

    user: {
        getProfile: () => api.request('/user'),
    },

    chatbot: {
        sendMessage: (text, history) =>
            api.request('/chatbot', {
                method: 'POST',
                body: JSON.stringify({ text, history }),
            }),
    },
};
