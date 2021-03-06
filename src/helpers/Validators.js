const EMAIL_REGEX = /^\w+(\.\w+)*@(\w+\.)*\w+$/;

export const dateBeforeCurrentValidator = (input) => {
    let errorMessage = null;
    const currentDate = Date.now();
    const providedDate = Date.parse(input);
    if(providedDate > currentDate) {
        errorMessage = "Birthdate cannot be ahead of current date";
    }
    return createValidationResult(errorMessage);
}

export const dateTimeBeforeValidator = (input, comparable) => {
    let errorMessage = null;
    comparable = new Date(comparable);
    const providedDate = Date.parse(input);
    if(providedDate <= comparable) {
        errorMessage = "Car can be ordered for at least 1 day";
    }
    return createValidationResult(errorMessage);
}

export const dateTimeAfterValidator = (input) => {
    let errorMessage = null;
    const currentDate = new Date();
    const providedDate = new Date(Date.parse(input))
    if(providedDate < currentDate) {
        errorMessage = "Cannot be same as or behind current date";
    }
    return createValidationResult(errorMessage);
}

export const equalityValidator = (input, comparable) => {
    let errorMessage = null;
    if(input !== comparable) {
        errorMessage = "Fields mismatch";
    }
    return createValidationResult(errorMessage);
}

export const nonEmptyValidator = (input) => {
    let errorMessage = null;
    if(!lengthValidator(input, 1, Number.MAX_VALUE).valid) {
        errorMessage = "Cannot be empty";
    }
    return createValidationResult(errorMessage);
};

export const alwaysValidValidator = (input) => {
    return createValidationResult(null);
};

export const emailValidator = (input) => {
    let errorMessage = null;
    if(!regexValidator(input, EMAIL_REGEX).valid) {
        errorMessage = "Malformed email";
    }
    return createValidationResult(errorMessage);
};

export const passwordValidator = (input) => {
    let errorMessage = null;
    let lengthValidationResult = lengthValidator(input, 4, 20);
    if(!lengthValidationResult.valid) {
        errorMessage = lengthValidationResult.errorMessage;
    }
    return createValidationResult(errorMessage);
};

export const lengthValidator = (input, minLength, maxLength) => {
    let errorMessage = null;
    if(input.length < minLength) {
        errorMessage = `At least ${minLength} character(s) expected`;
    } else if(input.length >= maxLength) {
        errorMessage = `At most ${maxLength - 1} character(s) expected`;
    }
    return createValidationResult(errorMessage);
}

export const regexValidator = (input, regex) => {
    let errorMessage = null;
    if(!regex.test(input)) {
        errorMessage = "Malformed input";
    }
    return createValidationResult(errorMessage);
};

const createValidationResult = (errorMessage) => {
    return {
        valid: errorMessage == null,
        errorMessage
    };
};