export const CHANGE_MODE = "CHANGE_MODE";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const changMode = (mode) => {
  return {
    type: CHANGE_MODE,
    payload: mode,
  };
};
export const changLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
};
