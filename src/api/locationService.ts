// src/api/locationService.ts
import { Coordinates } from '../types/types';
import api from './apiClient';

export const getLocationsByZipCodes = (zipCodes: string[]) => {
    return api.post('/locations', zipCodes);
};

export const searchLocations = (params: {
    city?: string,
    states?: string[],
    geoBoundingBox?: {
        top?: Coordinates,
        left?: Coordinates,
        bottom?: Coordinates,
        right?: Coordinates,
        bottom_left?: Coordinates,
        top_left?: Coordinates
    },
    size?: number,
    from?: number
}) => {
    return api.post('/locations/search', params);
};
