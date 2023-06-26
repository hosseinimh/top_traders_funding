import utils from "../../../utils/Utils";

const fileValidator = (
  schema,
  field,
  max = null,
  extensions = null,
  required = true
) => {
  const { validation } = utils.getLSLocale();
  schema = schema
    .test({
      message: validation.fileMaxSizeMessage.replace(":field", field) + "456",
      test: (file) => {
        if (!required) {
          return true;
        }
        const isValid = file?.size < max;
        return isValid;
      },
    })
    .test({
      message: validation.fileTypeMessage + "123",
      test: (file, context) => {
        if (!required || !file) {
          return true;
        }
        if (!extensions || extensions?.length === 0) {
          return true;
        }
        const isValid = extensions.includes(utils.getExtension(file?.name));
        if (!isValid) {
          context?.createError();
        }
        return isValid;
      },
    });
  return schema;
};

export default fileValidator;
