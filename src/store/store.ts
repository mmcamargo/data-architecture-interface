import { usersApi } from '@/services';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(usersApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
