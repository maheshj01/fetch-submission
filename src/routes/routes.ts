export const ROUTES = {
    LOGIN: '/login',
    DOGS: '/dogs',
    ROOT: '/',
} as const;

export type RouteKey = keyof typeof ROUTES; 