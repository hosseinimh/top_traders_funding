import * as yup from "yup";

import { nameValidator, stringValidator } from "../CommonValidators";
import { useLSLanguage } from "../../../hooks";

const { usersPage: strings } = useLSLanguage();

const searchUserSchema = yup.object().shape({
    username: stringValidator(yup.string(), strings.username, null, 50, false),
    nameFamily: nameValidator(
        yup.string(),
        strings.nameFamily,
        null,
        50,
        false
    ),
});

export default searchUserSchema;
