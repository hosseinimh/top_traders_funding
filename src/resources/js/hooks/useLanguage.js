import { useSelector } from "react-redux";

import { en, fa } from "../constants/strings";
import { LANGUAGES } from "../constants";

const useLanguage = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    switch (layoutState?.language) {
        case LANGUAGES.EN:
            return en;
        case LANGUAGES.FA:
            return fa;
        default:
            return fa;
    }
};

export default useLanguage;
