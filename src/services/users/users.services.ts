import { IDefaultResponse } from '@/shared/utils/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ICreateUserDTO {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8081',
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		createUser: builder.mutation<IDefaultResponse, ICreateUserDTO>({
			query: (data) => ({
				url: `/users/create`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useCreateUserMutation } = usersApi;
