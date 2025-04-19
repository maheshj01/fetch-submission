import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dogService from '../../api/dogService';

interface DogsState {
    breeds: string[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    totalResults: number;
}

const initialState: DogsState = {
    breeds: [],
    loading: false,
    error: null,
    page: 0,
    pageSize: 25,
    totalResults: 0,
};

export const fetchDogs = createAsyncThunk(
    'dogs/fetchDogs',
    async ({ page, pageSize }: { page: number; pageSize: number }, { rejectWithValue }) => {
        try {
            const response = await dogService.searchDogs({
                from: page * pageSize,
                size: pageSize,
            });
            return {
                breeds: response.data.resultIds as string[],
                totalResults: response.data.total,
            };
        } catch (error) {
            return rejectWithValue('Failed to fetch dogs');
        }
    }
);

const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDogs.fulfilled, (state, action) => {
                state.loading = false;
                state.breeds = action.payload.breeds;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(fetchDogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPage, setPageSize } = dogsSlice.actions;
export default dogsSlice.reducer; 