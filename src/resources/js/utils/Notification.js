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
    item.subCategory === NOTIFICATION_SUB_CATEGORIES.USER_EMAIL_VERIFIED
  ) {
    const { date, time } = utils.getTimezoneDate(item.createdAt, locale);
    return item.subCategoryText
      .replace(":field1", date)
      .replace(":field2", time);
  } else if (
    item.subCategory === NOTIFICATION_SUB_CATEGORIES.USER_VERIFICATION_REQUESTED
  ) {
    let messageFields = item.messageFields.split("|");
    if (messageFields?.length < 3) {
      messageFields = Array(3).fill("");
    }
    const [name, family, username] = messageFields;
    return item.subCategoryText
      .replace(":field1", name)
      .replace(":field2", family)
      .replace(":field3", username);
  } else if (
    item.subCategory === NOTIFICATION_SUB_CATEGORIES.USER_VERIFICATION_VERIFIED
  ) {
    const { date, time } = utils.getTimezoneDate(item.createdAt, locale);
    return item.subCategoryText
      .replace(":field1", date)
      .replace(":field2", time);
  } else if (
    item.subCategory === NOTIFICATION_SUB_CATEGORIES.USER_VERIFICATION_REJECTED
  ) {
    let messageFields = item.messageFieldsText.split("|");
    if (messageFields?.length < 2) {
      messageFields = Array(2).fill("");
    }
    const rejectReason = messageFields[1];
    const { date, time } = utils.getTimezoneDate(item.createdAt, locale);
    return item.subCategoryText
      .replace(":field1", rejectReason)
      .replace(":field2", date)
      .replace(":field3", time);
  } else if (
    item.subCategory === NOTIFICATION_SUB_CATEGORIES.TICKET_USER_REGISTERED
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
  } else if (
    item.subCategory ===
    NOTIFICATION_SUB_CATEGORIES.TICKET_ADMINISTRATOR_REGISTERED
  ) {
    let messageFields = item.messageFields.split("|");
    if (messageFields?.length < 4) {
      messageFields = Array(4).fill("");
    }
    const [ticketId, subject, name, family] = messageFields;
    return item.subCategoryText
      .replace(":field1", ticketId)
      .replace(":field2", subject)
      .replace(":field3", name)
      .replace(":field4", family);
  } else if (
    item.subCategory ===
    NOTIFICATION_SUB_CATEGORIES.TICKET_THREAD_USER_REGISTERED
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
  } else if (
    item.subCategory ===
    NOTIFICATION_SUB_CATEGORIES.TICKET_THREAD_ADMINISTRATOR_REGISTERED
  ) {
    let messageFields = item.messageFields.split("|");
    if (messageFields?.length < 4) {
      messageFields = Array(4).fill("");
    }
    const [ticketId, subject, name, family] = messageFields;
    return item.subCategoryText
      .replace(":field1", ticketId)
      .replace(":field2", subject)
      .replace(":field3", name)
      .replace(":field4", family);
  }
};

const notification = {
  getSubCategoryText,
};

export default notification;
