import * as yup from "yup";

import utils from "../../../utils/Utils";
import { fileValidator, stringValidator } from "../CommonValidators";

const { ticketThreadsPage: strings } = utils.getLSLocale();

const addTicketThreadSchema = yup.object().shape({
  content: stringValidator(yup.string(), strings.content, 10, 1000),
  file: fileValidator(
    yup.mixed(),
    2 * 1024 * 1024,
    ["jpg", "jpeg", "png", "gif"],
    false
  ),
});

export default addTicketThreadSchema;
