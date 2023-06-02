const BASE_PATH = `/panel`;
const ASSETS_PATH = "/assets";
const IMAGES_PATH = "/assets/images";
const STORAGE_PATH = "/storage";
const PAGE_ITEMS = 10;
const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

const themes = [
  {
    name: THEMES.DARK,
    colors: {
      text: "#fff",
      light: "#d4d8df",
      dark: "#0b0e12",
      body: "#141a22",
      lightBody: "#2f343b",
      link: "#0042a0",
      success: "#00a66a",
      danger: "#d55252",
      primary: "#45d6f0",
      primaryLight: "#4983d7",
      warning: "#ffe03a",
      darkWarning: "#e8a700",
      placeholder: "#8f959e",
      border: "#21262e",
      borderError: "#ff4a4a",
      borderErrorLight: "rgba(255, 74, 74, 0.4)",
      hover: "#1b2431",
      boxShadow: "0 0 1.875rem rgba(0, 0, 0, 0.5)",
      gradientBg:
        "linear-gradient(270deg, rgba(49, 54, 64, 0) 0%, #313640 49.01%, rgba(49, 54, 64, 0) 100%)",
      tableBtn: "#27313e",
      tableRowOdd: "#141a22",
      tableRowOddHover: "#191f28",
      tableRowEven: "#0b0e12",
      tableRowEvenHover: "rgba(11, 14, 18, 0.5)",
      alertSucessBackground: "rgba(35, 159, 64, 0.2)",
      alertSuccessBorder: "rgba(35, 159, 64, 0.5)",
      alertSuccessColor: "#239f40",
      alertDangerBackground: "rgba(159, 35, 35, 0.2)",
      alertDangerBorder: "rgba(159, 35, 35, 0.5)",
      alertDangerColor: "#bf2626",
    },
  },
  {
    name: THEMES.LIGHT,
    colors: {
      text: "#000",
      light: "#5c5b5b",
      dark: "#dfeef4",
      body: "#fcf8ec",
      lightBody: "#bdd6de",
      link: "#9dc7d8",
      success: "#00a66a",
      danger: "#d55252",
      primary: "#45d6f0",
      primaryLight: "#4983d7",
      warning: "#ffe03a",
      darkWarning: "#e8a700",
      placeholder: "#3a3a3a",
      border: "#c8dfe8",
      borderError: "#ff4a4a",
      borderErrorLight: "rgba(255, 74, 74, 0.4)",
      hover: "#1b2431",
      boxShadow: "0 0 1.875rem rgba(0, 0, 0, 0.5)",
      gradientBg:
        "linear-gradient(270deg, rgba(209, 215, 226, 0) 0%, #d1d7e2 49.01%, rgba(209, 215, 226, 0) 100%)",
      tableBtn: "#c9d9e0",
      tableRowOdd: "#fcf8ec",
      tableRowOddHover: "#ecf2fc",
      tableRowEven: "#dee8ec",
      tableRowEvenHover: "rgba(222, 232, 236, 0.5)",
      alertSucessBackground: "rgba(35, 159, 64, 0.2)",
      alertSuccessBorder: "rgba(35, 159, 64, 0.5)",
      alertSuccessColor: "#239f40",
      alertDangerBackground: "rgba(159, 35, 35, 0.2)",
      alertDangerBorder: "rgba(159, 35, 35, 0.5)",
      alertDangerColor: "#bf2626",
    },
  },
];

export {
  BASE_PATH,
  ASSETS_PATH,
  IMAGES_PATH,
  STORAGE_PATH,
  PAGE_ITEMS,
  THEMES,
  themes,
};
