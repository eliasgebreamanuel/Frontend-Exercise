export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    address: string;
    profilePic?: string; 
    isBuyer: boolean;
  }
  export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
  }