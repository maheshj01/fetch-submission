import api from "./apiClient";

class DogService {

    async login(name: string, email: string) {
        return api.post('/auth/login', { name, email });
    };

    async fetchBreeds() {
        try {
            const response = await api.get<string[]>('/dogs/breeds');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch dog breeds');
        }
    };

    async searchDogs(params: {
        breeds?: string[],
        zipCodes?: string[],
        ageMin?: number,
        ageMax?: number,
        size?: number,
        from?: number,
        sort?: string // e.g., "breed:asc"
    }) {
        const response = await api.get('/dogs/search', { params });
        return response.data;
    };

    async getDogsByIds(dogIds: string[]) {
        const response = await api.post('/dogs', dogIds);
        return response.data;
    };

    async getDogMatch(dogIds: string[]) {
        const response = await api.post<{ match: string }>('/dogs/match', dogIds);
        return response.data;
    };
}

export default new DogService();
