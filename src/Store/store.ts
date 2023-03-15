import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import catsSliderSlice from './rootReducer';

export const store = configureStore({
	reducer: {
		cats: catsSliderSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
