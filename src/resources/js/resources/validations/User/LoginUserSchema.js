import * as yup from "yup";

import { loginUserPage as strings } from "../../../constants/strings";
import { stringValidator } from "../CommonValidators";

const loginUserSchema = yup.object().shape({
    username: stringValidator(yup.string(), strings.username, 6, 50),
    password: stringValidator(yup.string(), strings.password, 6, 50),
});

export default loginUserSchema;
