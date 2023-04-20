import * as yup from "yup";

import { editCampaignPage as strings } from "../../../constants/strings";
import { stringValidator } from "../CommonValidators";

const editCampaignSchema = yup.object().shape({
    title: stringValidator(yup.string(), strings.title, 6, 200),
});

export default editCampaignSchema;
