import { en, fa } from "../constants/strings";
import { LANGUAGES } from "../constants";
import utils from "../utils/Utils";

const useLSLanguage = () => {
    const language = utils.getLSVariable("language");
    switch (language) {
        case LANGUAGES.EN:
            return en;
        case LANGUAGES.FA:
            return fa;
        default:
            return fa;
    }
};

export default useLSLanguage;
