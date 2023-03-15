import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Cat {
	id: string;
	breedId: string;
	description: string;
	name: string;
}

export interface Cats {
	cats: Cat[];
}

const initialState: Cats = {
	cats: [],
};

export const catsSliderSlice = createSlice({
	name: 'catsSlider',
	initialState,
	reducers: {
		addCats: (state, action: PayloadAction<Array<Cat>>) => {
			state.cats = [...action.payload];
		},
	},
});

export const { addCats } = catsSliderSlice.actions;
export const selectCats = (state: RootState) => state.cats;


export default catsSliderSlice.reducer;
