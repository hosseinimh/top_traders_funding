import utils from "../../../utils/Utils";

const mobileValidator = (schema, field, required = true) => {
  const { validation } = utils.getLSLocale();
  schema = schema.matches(
    /^([0][9][1-4][0-9]{8})+$/,
    validation.notValidMessage.replace(":field", field)
  );
  if (required) {
    schema = schema.required(
      validation.requiredMessage.replace(":field", field)
    );
  }
  return schema;
};

export default mobileValidator;
