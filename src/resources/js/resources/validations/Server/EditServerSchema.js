import * as yup from "yup";

import { asciiValidator, stringValidator } from "../CommonValidators";
import { useLSLocale } from "../../../hooks";

const { editServerPage: strings } = useLSLocale();

const editServerSchema = yup.object().shape({
  name: asciiValidator(yup.string(), strings.name, 3, 50),
  title: stringValidator(yup.string(), strings.title, 3, 50),
});

export default editServerSchema;
