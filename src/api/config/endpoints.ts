export const ENDPOINTS = {
    AUTH: {
        LOGIN: 'auth/login/',
        REGISTER: 'auth/register/',
    },
    USERS: {
        LIST: 'users/',
        DETAIL: (id: string) => `users/${id}/`,
    },
};
