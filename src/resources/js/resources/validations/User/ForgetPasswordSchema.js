import * as yup from "yup";

import { signupPage as strings } from "../../../constants/strings";
import { emailValidator } from "../CommonValidators";

const forgetPasswordSchema = yup.object().shape({
    email: emailValidator(yup.string(), strings.email),
});

export default forgetPasswordSchema;
