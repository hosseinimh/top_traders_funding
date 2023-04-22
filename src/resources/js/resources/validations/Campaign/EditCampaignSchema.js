import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { useLSLanguage } from "../../../hooks";

const { editCampaignPage: strings } = useLSLanguage();

const editCampaignSchema = yup.object().shape({
    title: stringValidator(yup.string(), strings.title, 6, 200),
});

export default editCampaignSchema;
