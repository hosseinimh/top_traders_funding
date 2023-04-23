import stringValidator from "./stringValidator";
import utils from "../../../utils/Utils";

const nameValidator = (schema, field, min = 2, max = 50, required = true) => {
    const { validation } = utils.getLSLocale();
    return stringValidator(schema, field, min, max, required).matches(
        /^[آ-ی ]+$/,
        validation.stringMessage.replace(":field", field)
    );
};

export default nameValidator;
