import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dogService from '../../api/dogService';
import { Dog } from '@/src/types/types';

interface DogsState {
    breeds: string[];
    dogs: Dog[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    totalResults: number;
    sort: 'asc' | 'desc';
    filter: 'breed' | 'name' | 'age';
}

const initialState: DogsState = {
    breeds: [],
    dogs: [],
    loading: false,
    error: null,
    page: 0,
    pageSize: 25,
    sort: 'asc',
    totalResults: 0,
    filter: 'breed',
};

export const fetchDogs = createAsyncThunk(
    'dogs/fetchDogs',
    async ({ page, pageSize, sort, filter }: { page: number; pageSize: number, sort: string, filter: string }, { rejectWithValue }) => {
        try {
            const searchData = await dogService.searchDogs({
                from: page * pageSize,
                size: pageSize,
                sort: `${filter}:${sort}`
            });
            const dogsData = await dogService.getDogsByIds(searchData.resultIds);
            return {
                breeds: searchData.resultIds,
                totalResults: searchData.total,
                dogs: dogsData
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
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
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
                state.dogs = action.payload.dogs;
            })
            .addCase(fetchDogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPage, setPageSize, setSort, setFilter } = dogsSlice.actions;
export default dogsSlice.reducer;