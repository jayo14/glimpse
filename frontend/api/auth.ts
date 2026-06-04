import { api, setAccessToken } from '../lib/axios';
import { LoginInput, SignupInput } from '../validators/auth';

export interface AuthResponse {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string;
    };
    profile: {
        id: string;
        full_name?: string;
        role: 'HOST' | 'PHOTOGRAPHER' | 'GUEST' | null;
        avatar_url?: string | null;
    };
    access_token?: string;
    email_confirmation_required?: boolean;
}

type UpdateProfileInput = {
    role?: 'HOST' | 'PHOTOGRAPHER' | 'GUEST';
    full_name?: string;
    avatar_url?: string;
};

export const AuthService = {
    async signup(data: SignupInput): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.access_token) {
            setAccessToken(response.data.access_token);
        }
        return response.data;
    },

    async verifyEmail(access_token: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(
            '/auth/verify-email',
            { access_token }
        );

        if (response.data.access_token) {
            setAccessToken(response.data.access_token);
        }

        return response.data;
    },

    async login(data: LoginInput): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.access_token) {
            setAccessToken(response.data.access_token);
        }
        return response.data;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            // This now correctly removes 'access_token' from localStorage
            setAccessToken(null);
        }
    },

    async refreshSession(): Promise<{ access_token: string }> {
        const response = await api.post('/auth/refresh');

        if (response.data.access_token) {
            setAccessToken(response.data.access_token);
        }

        return response.data;
    },

    async getMe(): Promise<AuthResponse> {
        const response = await api.get<AuthResponse>('/user/me');
        return response.data;
    },

    async updateProfile(data: UpdateProfileInput): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(
            '/user/profile-update',
            data
        );
        return response.data;
    }
};