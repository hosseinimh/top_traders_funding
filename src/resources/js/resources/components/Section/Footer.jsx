import React from "react";

import { useLocale } from "../../../hooks";
import utils from "../../../utils/Utils";
import { LOCALES } from "../../../constants";

const Footer = () => {
    const { footer: strings } = useLocale();

    return (
        <>
            <div className="app-footer">
                <div className="app-footer__inner">
                    <div className="app-footer-right">
                        <ul className="nav">
                            <li className="nav-item">
                                <span className="nav-link">
                                    {strings.copyright}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="app-footer-left">
                        <ul className="nav">
                            <li
                                className={`nav-item d-flex ${
                                    utils.getLSVariable("locale") === LOCALES.FA
                                        ? "flex-row"
                                        : "flex-row-reverse"
                                }`}
                            >
                                <span className="nav-link">
                                    {strings.developedBy}:
                                </span>
                                <span>
                                    <a
                                        href={strings.developerUrl}
                                        target={"_blank"}
                                        className="nav-link px-0"
                                    >
                                        {strings.developer}
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
