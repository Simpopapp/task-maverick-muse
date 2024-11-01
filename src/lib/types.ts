export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export type UserRole = 'guest' | 'member' | 'leader';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}