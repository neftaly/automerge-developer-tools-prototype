export const isObject = (v) => typeof v === "object" && v !== null;

export const isNumber = (value) => String(Number(value)) === String(value);

export const isString = (value) => {
  if (isNumber(value)) return false;
  switch (String(value).toLowerCase()) {
    case "true":
    case "false":
    case "null":
      return false;
    default:
      return true;
  }
};

export const isValidJSON = (value) => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

export const EVENTS = {
  COPY: "copy",
  EXPORT: "export",
  IMPORT: "import",
  ADD: "add",
  DELETE: "delete",
  CHANGE_KEY: "change_key",
  CHANGE_VALUE: "change_value",
};
