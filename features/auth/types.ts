export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'conference_admin' | 'registration_team' | 'participant';
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

