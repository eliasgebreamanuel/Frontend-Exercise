
import { User } from '../types/types';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const fetchUsersRequest = (limit?: number) => ({
  type: FETCH_USERS_REQUEST,
  payload: { limit },
});

export const fetchUsersSuccess = (users: User[]) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const updateUserInfo = (userInfo: UserInfo) => ({
  type: UPDATE_USER_INFO,
  payload: userInfo,
});
