import * as yup from "yup";

import utils from "../../../utils/Utils";
import {
  fileValidator,
  numberValidator,
  stringValidator,
} from "../CommonValidators";

const { addTicketPage: strings } = utils.getLSLocale();

const addTicketSchema = yup.object().shape({
  type: numberValidator(yup.number(), strings.type, 1, 5),
  subject: stringValidator(yup.string(), strings.subject, 10, 200),
  content: stringValidator(yup.string(), strings.content, 10, 1000),
  file: fileValidator(
    yup.mixed(),
    2 * 1024 * 1024,
    ["jpg", "jpeg", "gif"],
    false
  ),
});

export default addTicketSchema;
