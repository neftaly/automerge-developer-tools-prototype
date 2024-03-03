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
  CONTEXTMENU: "contextmenu",
};

const fileOpenPrompt = (attributes) =>
  new Promise((resolve) => {
    const input = Object.assign(document.createElement("input"), {
      ...attributes,
      value: "",
      type: "file",
      onchange: (event) => resolve(Array.from(event.target.files)),
    });
    input.click();
    window.v8GcBugFix = input; // Fix unreported GC bug in V8
  });

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });

export const loadFileFromPrompt = () =>
  fileOpenPrompt({
    accept: "application/json",
    multiple: false,
  })
    .then((files) => Promise.all(files.map(readFile)))
    .then((files) => {
      const data = JSON.parse(files[0]);
      return Promise.resolve(data);
    });
