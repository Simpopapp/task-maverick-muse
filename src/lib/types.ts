export type Priority = 'low' | 'medium' | 'high';
export type UserRole = 'guest' | 'member' | 'leader';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  last_login: Date;
  created_at: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  due_date: Date;
  assignee_id: string;
  created_by: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  userId: string;
}

export interface TaskHistory {
  id: string;
  task_id: string;
  changed_by: string;
  change_type: 'created' | 'updated' | 'deleted';
  previous_state: Partial<Task>;
  new_state: Partial<Task>;
  created_at: Date;
}

export interface ApprovedEmail {
  id: string;
  email: string;
  role: UserRole;
  approved_by: string;
  created_at: Date;
}