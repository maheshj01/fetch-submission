import api from "./apiClient";

export const login = (name: string, email: string) => {
    return api.post('/auth/login', { name, email });
};

export const logout = () => {
    return api.post('/auth/logout');
};

export const fetchBreeds = () => {
    return api.get<string[]>('/dogs/breeds');
};

export const searchDogs = (params: {
    breeds?: string[],
    zipCodes?: string[],
    ageMin?: number,
    ageMax?: number,
    size?: number,
    from?: number,
    sort?: string // e.g., "breed:asc"
}) => {
    return api.get('/dogs/search', { params });
};

export const getDogsByIds = (dogIds: string[]) => {
    return api.post('/dogs', dogIds);
};

export const getDogMatch = (dogIds: string[]) => {
    return api.post<{ match: string }>('/dogs/match', dogIds);
};
