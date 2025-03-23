export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: string;
        username: string;
        email: string;
        roles?: string[]; 
    };
}


export interface CreateUserRequest {
    username: string;
    password: string;
    email: string;
}
