import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cat } from './rootReducer';

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=10');
            const data = await response.json();
            const dataArray = data.map(
                (obj: any): Cat => ({
                    name: obj.name,
                    breedId: obj.id,
                    description: obj.description,
                    id: obj.reference_image_id,
                })
            );
            return dataArray;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
