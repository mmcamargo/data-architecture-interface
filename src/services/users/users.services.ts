import { IDefaultResponse } from '@/shared/utils/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8081',
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getAllUsers: builder.query<IDefaultResponse, void>({
			query: () => `/users`,
			providesTags: ['User'],
		}),
		postUser: builder.mutation<IDefaultResponse, string>({
			query: (name) => ({
				url: `/user`,
				method: 'POST',
				body: { name },
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

const { useGetAllUsersQuery, usePostUserMutation } = usersApi;

export { useGetAllUsersQuery, usePostUserMutation };

export default usersApi;
