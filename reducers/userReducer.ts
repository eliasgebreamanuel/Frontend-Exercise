import { User } from '../types/types';
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions/userActions';
import { UPDATE_USER_INFO } from '../actions/userActions';

interface UserState {
  loading: boolean;
  users: User[];
  error: string | null;
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
  isAuthenticated: false,
  currentUser: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    case UPDATE_USER_INFO:
      const updatedUserInfo = action.payload;
      const userIndex = state.users.findIndex(user => user._id === updatedUserInfo._id);
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updatedUserInfo };
        return {
          ...state,
          users: updatedUsers
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default userReducer;
