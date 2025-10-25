export interface User {
  id: string;
  email: string;
  user_type: 'worker' | 'employer';
  full_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  pay_amount: number;
  pay_type: 'hourly' | 'fixed';
  category: string;
  status: 'active' | 'filled' | 'expired';
}

export interface Application {
  id: string;
  job_id: string;
  worker_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}
