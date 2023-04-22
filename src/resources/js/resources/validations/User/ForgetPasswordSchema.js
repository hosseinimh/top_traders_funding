import * as yup from "yup";

import { emailValidator } from "../CommonValidators";
import { useLSLanguage } from "../../../hooks";

const { forgetPasswordPage: strings } = useLSLanguage();

const forgetPasswordSchema = yup.object().shape({
    email: emailValidator(yup.string(), strings.email),
});

export default forgetPasswordSchema;
