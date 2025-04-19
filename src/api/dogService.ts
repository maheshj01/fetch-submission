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
        return api.get('/dogs/search', { params });
    };

    async getDogsByIds(dogIds: string[]) {
        return api.post('/dogs', dogIds);
    };

    async getDogMatch(dogIds: string[]) {
        return api.post<{ match: string }>('/dogs/match', dogIds);
    };
}

export default new DogService();
