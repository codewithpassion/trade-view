import { v4 as uuidv4 } from 'uuid';

import { User } from '@/api/user/userModel';

export const users: User[] = [
  { id: uuidv4(), name: 'Alice', email: 'alice@example.com', createdAt: new Date(), updatedAt: new Date() },
  { id: uuidv4(), name: 'Bob', email: 'bob@example.com', createdAt: new Date(), updatedAt: new Date() },
];

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    return users;
  },

  findByIdAsync: async (id: string): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
  },
};
