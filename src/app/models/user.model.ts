export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// DTO data transfer Object
export interface CreateUserDTO extends Omit<User, 'id'> {}

export interface LoginUserDTO extends Omit<User, 'id' | 'name'> {}