import utils from "./Utils";
import { NOTIFICATION_SUB_CATEGORIES } from "../constants";

const getSubCategoryText = (item, locale) => {
  if (item.subCategory === NOTIFICATION_SUB_CATEGORIES.LOGIN_SUCCEED) {
    const { date, time } = utils.getTimezoneDate(item.createdAt, locale);
    return item.subCategoryText
      .replace(":field1", date)
      .replace(":field2", time)
      .replace(":field3", item.messageFields);
  } else if (
    item.subCategory === NOTIFICATION_SUB_CATEGORIES.TICKET_REGISTERED
  ) {
    let messageFields = item.messageFields.split("|");
    if (messageFields?.length < 5) {
      messageFields = Array(5).fill("");
    }
    const [ticketId, subject, name, family, username] = messageFields;
    return item.subCategoryText
      .replace(":field1", ticketId)
      .replace(":field2", subject)
      .replace(":field3", name)
      .replace(":field4", family)
      .replace(":field5", username);
  } else if (item.subCategory === NOTIFICATION_SUB_CATEGORIES.TICKET_ANSWERED) {
    let messageFields = item.messageFields.split("|");
    if (messageFields?.length < 6) {
      messageFields = Array(6).fill("");
    }
    const [ticketId, subject] = messageFields;
    return item.subCategoryText
      .replace(":field1", ticketId)
      .replace(":field2", subject);
  }
};

const notification = {
  getSubCategoryText,
};

export default notification;
