import * as yup from "yup";

import { stringValidator } from "../CommonValidators";
import { useLSLanguage } from "../../../hooks";

const { addCampaignPage: strings } = useLSLanguage();

const addCampaignSchema = yup.object().shape({
    title: stringValidator(yup.string(), strings.title, 6, 200),
});

export default addCampaignSchema;
