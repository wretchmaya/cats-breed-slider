import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { fetchCats } from './api';

export interface Cat {
	id: string;
	breedId: string;
	description: string;
	name: string;
};

export interface Cats {
	cats: Cat[];
};

const initialState: Cats = {
	cats: [],
};

export const catsSliderSlice = createSlice({
	name: 'catsSlider',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCats.fulfilled, (state, action) => {
			state.cats = [...state.cats, ...action.payload]
		})
	},
});


export const selectCats = (state: RootState) => state.cats;

export default catsSliderSlice.reducer;
