import * as yup from "yup";

import utils from "../../../utils/Utils";
import { numberValidator, stringValidator } from "../CommonValidators";

const { addTicketPage: strings } = utils.getLSLocale();

const addTicketSchema = yup.object().shape({
    type: numberValidator(yup.number(), strings.type),
    subject: stringValidator(yup.number(), strings.subject, 10, 200),
    content: stringValidator(yup.number(), strings.content, 10, 1000),
});

export default addTicketSchema;
