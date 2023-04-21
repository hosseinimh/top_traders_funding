import { useSelector } from "react-redux";

import { en } from "../constants/strings";
import { fa } from "../constants/strings";
import { LANGUAGES } from "../constants";

const useLanguage = () => {
    let language;
    const layoutState = useSelector((state) => state.layoutReducer);

    switch (layoutState?.language) {
        case LANGUAGES.EN:
            language = en;
            break;
        case LANGUAGES.FA:
            language = fa;
            break;
        default:
            language = fa;
            break;
    }

    return language;
};

export default useLanguage;
