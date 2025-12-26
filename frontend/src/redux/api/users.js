import { apiSlice } from "./apiSlice";

import { USERS_URL } from "../constants.js";
import { data } from "react-router";

// export const usersApi = apiSlice.injectEndpoints({ 
//   endpoints: (builder) => ({ 
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/auth`,
//         method: "POST",
//         body: data,
//       })
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/register`,
//         method: "POST",
//         body: data,
//       })
//     })
//   })
// })

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      })
    })
  }),
});


export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = usersApi;