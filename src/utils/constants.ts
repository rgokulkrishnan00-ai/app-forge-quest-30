export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  MESSAGES: '/messages',
  APPLICATIONS: '/applications',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  WORKER_REGISTER: '/register/worker',
  EMPLOYER_REGISTER: '/register/employer',
  SETTINGS: '/settings',
} as const;

export const USER_TYPES = {
  WORKER: 'worker',
  EMPLOYER: 'employer',
} as const;
