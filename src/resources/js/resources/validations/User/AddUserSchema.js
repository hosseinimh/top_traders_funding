import * as yup from "yup";

import { validation, addUserPage as strings } from "../../../constants/strings";
import {
    emailValidator,
    nameValidator,
    stringValidator,
} from "../CommonValidators";

const addUserSchema = yup.object().shape({
    username: stringValidator(yup.string(), strings.username, 6, 50),
    email: emailValidator(yup.string(), strings.email),
    password: stringValidator(yup.string(), strings.password, 6, 50),
    confirmPassword: stringValidator(
        yup.string(),
        strings.confirmPassword
    ).oneOf(
        [yup.ref("password")],
        validation.confirmedMessage.replace(":field", strings.password)
    ),
    name: nameValidator(yup.string(), strings.name, 2, 50),
    family: nameValidator(yup.string(), strings.family, 2, 50),
});

export default addUserSchema;
