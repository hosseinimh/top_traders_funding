import * as yup from "yup";

import { fileValidator } from "../CommonValidators";
import { useLSLocale } from "../../../hooks";

const { verifyUserRequestPage: strings } = useLSLocale();

const verifyUserRequest3Schema = yup.object().shape({
  selfieFile: fileValidator(yup.mixed(), strings.selfieFile, 4 * 1024 * 1024, [
    "jpg",
    "jpeg",
    "png",
  ]),
  identityFile: fileValidator(
    yup.mixed(),
    strings.identityFile,
    4 * 1024 * 1024,
    ["jpg", "jpeg", "png"]
  ),
});

export default verifyUserRequest3Schema;
