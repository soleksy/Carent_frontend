const EMAIL_REGEX = /.*/ // /[A-Za-z0-9]\w*(\.\w+)*@[A-Za-z0-9]\w*(\.\w+)*[A-Za-z0-9]/;

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
        errorMessage: errorMessage
    };
};