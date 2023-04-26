import serverConfig from "../../../server-config.json";
import { HEADER_BUTTONS } from "./headerButtons";
import { MESSAGE_TYPES } from "./messageTypes";
import { MESSAGE_CODES } from "./messageCodes";
import { UPLOADED_FILE } from "./UploadedFile";
import { LOCALES } from "./locales";
import { USER_ROLES } from "./userRoles";
import { TICKET_TYPES } from "./ticketTypes";
import { BASE_PATH, ASSETS_PATH, IMAGES_PATH, PAGE_ITEMS } from "./theme";

const BASE_URL = serverConfig.baseUrl;

export {
    BASE_URL,
    BASE_PATH,
    ASSETS_PATH,
    IMAGES_PATH,
    PAGE_ITEMS,
    HEADER_BUTTONS,
    MESSAGE_TYPES,
    MESSAGE_CODES,
    UPLOADED_FILE,
    LOCALES,
    USER_ROLES,
    TICKET_TYPES,
};
