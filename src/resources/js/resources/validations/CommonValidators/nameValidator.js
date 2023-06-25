import stringValidator from "./stringValidator";
import { useLSLocale } from "../../../hooks";
import { LOCALES } from "../../../constants";

const nameValidator = (schema, field, min = 2, max = 50, required = true) => {
  const { general, validation } = useLSLocale();
  const regex = required
    ? general.locale === LOCALES.FA
      ? /^[آ-ی ]+$/
      : /^[a-zA-Z ]+$/
    : general.locale === LOCALES.FA
    ? /^[آ-ی ]*$/
    : /^[a-zA-Z ]*$/;
  return stringValidator(schema, field, min, max, required).matches(
    regex,
    validation.stringMessage.replace(":field", field)
  );
};

export default nameValidator;
