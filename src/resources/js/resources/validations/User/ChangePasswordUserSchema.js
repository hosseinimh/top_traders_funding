import * as yup from "yup";

import {
    validation,
    changePasswordUserPage as strings,
} from "../../../constants/strings";
import { stringValidator } from "../CommonValidators";

const changePasswordUserSchema = yup.object().shape({
    newPassword: stringValidator(yup.string(), strings.newPassword, 6, 50),
    confirmPassword: stringValidator(
        yup.string(),
        strings.confirmPassword
    ).oneOf(
        [yup.ref("newPassword")],
        validation.confirmedMessage.replace(":field", strings.newPassword)
    ),
});

export default changePasswordUserSchema;
