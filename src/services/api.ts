import axios from 'axios';
import { Dog, Location, SearchParams, SearchResponse, Match, LoginCredentials } from '../types/api';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const getBreeds = async (): Promise<string[]> => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

export const searchDogs = async (params: SearchParams): Promise<SearchResponse> => {
  const response = await api.get('/dogs/search', { params });
  return response.data;
};

export const getDogs = async (dogIds: string[]): Promise<Dog[]> => {
  const response = await api.post('/dogs', dogIds);
  return response.data;
};

export const getMatch = async (dogIds: string[]): Promise<Match> => {
  const response = await api.post('/dogs/match', dogIds);
  return response.data;
};

export const getLocations = async (zipCodes: string[]): Promise<Location[]> => {
  const response = await api.post('/locations', zipCodes);
  return response.data;
};

export const searchLocations = async (params: any): Promise<{ results: Location[]; total: number }> => {
  const response = await api.post('/locations/search', params);
  return response.data;
}; 