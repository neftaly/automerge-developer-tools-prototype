import { saveAs } from "file-saver";

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

export const load = () =>
  fileOpenPrompt({
    accept: "application/json",
    multiple: false,
  })
    .then((files) => Promise.all(files.map(readFile)))
    .then((files) => {
      const data = JSON.parse(files[0]);
      return Promise.resolve(data);
    });

export const save = (data) => {
  const filename = `automerge-export.json`;
  saveAs(
    new Blob([JSON.stringify(data)], {
      type: "application/json;charset=utf-8",
    }),
    filename,
  );
  return Promise.resolve(filename);
};
