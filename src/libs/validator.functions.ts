interface IHistory {
    title: string;
    description: string;
}

interface IUser {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

interface IValidatedResponse {
    error: boolean;
    message: string;
}

export const isValidateHistory = (body: IHistory): boolean => {
    if (body.title.length < 5) {
        return false;
    }

    if (body.description.length < 10) {
        return false;
    }

    return true;
};

export const isValidateUser = (body: IUser): IValidatedResponse => {
    if (body.username.length === 0) {
        return {
            error: true,
            message: 'The name is required',
        };
    }

    if (body.firstName.length === 0) {
        return {
            error: true,
            message: 'The first name is required',
        };
    }

    if (body.lastName.length === 0) {
        return {
            error: true,
            message: 'The last name is required',
        };
    }

    if (body.password.length === 0) {
        return {
            error: true,
            message: 'The password is required',
        };
    }

    return {
        error: false,
        message: '',
    };
};
