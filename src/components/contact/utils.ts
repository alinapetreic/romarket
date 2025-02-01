import { VALIDATION_CONFIG } from "./constants";

export const validateField = (
    fieldName: keyof typeof VALIDATION_CONFIG,
    value: string
): string => {
    const config = VALIDATION_CONFIG[fieldName];

    if (value === '') {
        return config.messages.required;
    }

    if (value.length < config.rules.minLength) {
        return config.messages.minLength;
    }

    if (value.length > config.rules.maxLength) {
        return config.messages.maxLength;
    }

    if (config.rules.regex && !config.rules.regex.test(value)) {
        return config.messages.pattern || '';
    }

    return '';
};
