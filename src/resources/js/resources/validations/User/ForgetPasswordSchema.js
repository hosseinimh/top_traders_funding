import * as yup from "yup";

import { emailValidator } from "../CommonValidators";
import { useLSLocale } from "../../../hooks";

const { forgetPasswordPage: strings } = useLSLocale();

const forgetPasswordSchema = yup.object().shape({
    email: emailValidator(yup.string(), strings.email),
});

export default forgetPasswordSchema;
