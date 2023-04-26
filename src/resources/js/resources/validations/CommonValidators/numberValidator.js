import utils from "../../../utils/Utils";

const numberValidator = (schema, field, required = true) => {
    const { validation } = utils.getLSLocale();
    schema = schema.typeError(
        validation.numberMessage.replace(":field", field)
    );
    if (required) {
        schema = schema.required(
            validation.requiredMessage.replace(":field", field)
        );
    }
    return schema;
};

export default numberValidator;
