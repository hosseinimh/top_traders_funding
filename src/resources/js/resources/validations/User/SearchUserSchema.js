import * as yup from "yup";

import { usersPage as strings } from "../../../constants/strings";
import { nameValidator, stringValidator } from "../CommonValidators";

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
