import * as yup from "yup";

import { addAppRulePage as strings } from "../../../constants/strings";
import { stringValidator } from "../CommonValidators";

const addAppRuleSchema = yup.object().shape({
    title: stringValidator(yup.string(), strings.title, 6, 200),
    body: stringValidator(yup.string(), strings.body, 6, 2000),
});

export default addAppRuleSchema;
