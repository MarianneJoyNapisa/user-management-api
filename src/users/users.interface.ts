export interface UserType {
    title: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    password: string;
    confimPassword: string;
    passwordHash: string;
}

export interface UserUpdate {
    title?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
    password?: string;
    passwordHash?: string;
}