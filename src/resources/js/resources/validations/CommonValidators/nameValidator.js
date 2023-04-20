import { validation } from "../../../constants/strings";
import stringValidator from "./stringValidator";

const nameValidator = (schema, field, min = 2, max = 50, required = true) => {
    return stringValidator(schema, field, min, max, required).matches(
        /^[آ-ی ]+$/,
        validation.stringMessage.replace(":field", field)
    );
};

export default nameValidator;
