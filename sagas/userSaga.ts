import { UPDATE_USER_INFO, fetchUsersSuccess, fetchUsersFailure, FETCH_USERS_REQUEST } from '../actions/userActions';
import { User, UserInfo } from '../types/types';
import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from '../store/';
import { fetchUsers } from '../api/userApi';

function* updateUserProfileSaga(action: { type: string, payload: UserInfo }): Generator<any, void, any> {
  try {
    console.log('Updating user profile...');

    const updatedUserInfo = action.payload;

    const loggedInUserId: string | undefined = yield select((state: RootState) => state.user.currentUser?._id);

    if (!loggedInUserId) {
      throw new Error('User ID not found. Please make sure the user is logged in.');
    }

    console.log('Logged-in user ID:', loggedInUserId);
    console.log('Updated user info:', updatedUserInfo);

    const response = yield axios.put(`/api/users/profile?id=${loggedInUserId}`, updatedUserInfo);

    console.log('Profile update response:', response.data);

    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    console.error('Error updating user profile:', error);
    yield put(fetchUsersFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

function* fetchUsersSaga(action: any) {
  try {
    const { limit } = action.payload;
    const response: User[] = yield fetchUsers(limit);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(UPDATE_USER_INFO, updateUserProfileSaga);
}

export default userSaga;
export { userSaga };


