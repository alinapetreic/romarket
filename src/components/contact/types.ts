type ValidationRule = {
    minLength: number;
    maxLength: number;
    regex?: RegExp;
};

type ValidationMessages = {
    required: string;
    minLength: string;
    maxLength: string;
    pattern?: string;
};

export type ValidationConfig = {
    [key: string]: {
        rules: ValidationRule;
        messages: ValidationMessages;
    };
};