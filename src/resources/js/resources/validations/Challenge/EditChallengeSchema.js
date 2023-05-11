import * as yup from "yup";

import { numberValidator, stringValidator } from "../CommonValidators";
import { useLSLocale } from "../../../hooks";

const { editChallengePage: strings } = useLSLocale();

const editChallengeSchema = yup.object().shape({
  accountNo: numberValidator(yup.number(), strings.accountNo, 1, 99999999),
  password: stringValidator(yup.string(), strings.password, 5, 50),
  investorPassword: stringValidator(
    yup.string(),
    strings.investorPassword,
    5,
    50
  ),
});

export default editChallengeSchema;