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

type ForgotPasswordInput = {
    email: string;
};

type ResetPasswordInput = {
    access_token: string;
    password?: string; 
    confirm_password?: string;
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

    async resendVerificationEmail(): Promise<{ success: boolean; message: string }> {
        const response = await api.post<{ success: boolean; message: string }>(
            '/auth/resend-verification'
        );
        return response.data;
    },

    async login(data: LoginInput): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.access_token) {
            setAccessToken(response.data.access_token);
        }
        return response.data;
    },

    // Request Password Reset Link
    async forgotPassword(data: ForgotPasswordInput): Promise<{ success: boolean; message: string }> {
        const response = await api.post<{ success: boolean; message: string }>(
            '/auth/forgot-password', 
            data
        );
        return response.data;
    },

    // Submit New Password via Email Security Reset Token
    async resetPassword(data: ResetPasswordInput): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(
            '/auth/reset-password', 
            data
        );
        
        // Logs them in instantly if your API securely issues a session payload post-reset
        if (response.data.access_token) {
            setAccessToken(response.data.access_token);
        }
        return response.data;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
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