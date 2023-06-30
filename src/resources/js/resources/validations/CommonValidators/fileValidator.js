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
    .test(
      "required",
      validation.requiredMessage.replace(":field", field),
      (file) => {
        if (!file || file.size === 0) {
          if (!required) {
            return true;
          }
          return false;
        }
        return true;
      }
    )
    .test(
      "fileSize",
      validation.fileMaxSizeMessage.replace(":field", field),
      (file) => {
        if (file?.size < max) {
          return true;
        }
        return false;
      }
    )
    .test("fileType", validation.fileTypeMessage, (file) => {
      if (!extensions || extensions?.length === 0) {
        return true;
      }
      try {
        if (extensions.includes(utils.getExtension(file?.name)[0])) {
          return true;
        }
        return false;
      } catch {}
      return false;
    });
  return schema;
};

export default fileValidator;
