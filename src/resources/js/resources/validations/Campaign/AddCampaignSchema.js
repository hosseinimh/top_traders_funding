import * as yup from "yup";

import { addCampaignPage as strings } from "../../../constants/strings";
import { stringValidator } from "../CommonValidators";

const addCampaignSchema = yup.object().shape({
    title: stringValidator(yup.string(), strings.title, 6, 200),
});

export default addCampaignSchema;
