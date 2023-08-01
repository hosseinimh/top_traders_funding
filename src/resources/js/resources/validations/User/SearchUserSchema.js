import * as yup from "yup";

import { nameValidator, stringValidator } from "../CommonValidators";
import { useLSLocale } from "../../../hooks";

const { usersPage: strings } = useLSLocale();

const searchUserSchema = yup.object().shape({
  username: stringValidator(yup.string(), strings.username, null, 50, false),
  name: nameValidator(yup.string(), strings.name, null, 50, false),
  family: nameValidator(yup.string(), strings.family, null, 50, false),
  email: stringValidator(yup.string(), strings.email, null, 50, false),
});

export default searchUserSchema;
