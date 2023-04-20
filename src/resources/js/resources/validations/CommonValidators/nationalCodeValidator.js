import { validation } from "../../../constants/strings";

const nationalCodeValidator = (schema, field, required = true) => {
    schema = schema
        .matches(/^[0-9]+$/, validation.numberMessage.replace(":field", field))
        .min(
            10,
            validation.minDigitMessage
                .replace(":field", field)
                .replace(":min", "10")
        )
        .max(
            10,
            validation.maxDigitMessage
                .replace(":field", field)
                .replace(":max", "10")
        );
    if (required) {
        schema = schema.required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return schema;
};

export default nationalCodeValidator;
