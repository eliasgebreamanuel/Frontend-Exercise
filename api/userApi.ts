

import axios from 'axios';
import { User } from '../types/types';

export const fetchUsers = async (limit: number = 10): Promise<User[]> => {
  try {
    // this is used to fetch all the users from the endpoint
    const response = await axios.get(`http://143.198.168.244:3000/api/users/fetch/dummy/user-v2?page=1&limit=${limit}`);
    return response.data.data; 
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
