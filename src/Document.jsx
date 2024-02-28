import { useState } from "react";
import { Tree } from "./Tree";
import testdata from "./testdata";
import { EVENTS } from "./Tree";
import { saveAs } from "file-saver";
import { path, assocPath } from "ramda";

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

// load()
//   .then(({ children }) =>
//     handle.change((doc) => {
//       for (const key in doc) delete doc[key]
//       for (const key in children) doc[key] = children[key]
//     })
//   )
//   .catch((error) => {
//     console.warn('File error', error)
//     alert('File error: ' + error.message)
//   })

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

export const Document = ({ url }) => {
  const [doc, changeDoc] = useState(testdata);
  if (!url) return null;
  const handleAdd = {};
  return (
    <div
      style={{
        flex: 1,
        order: 2,
        padding: "1em 2em 1em 2em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: "1em",
        }}
      >
        Document: "{url}"
      </div>
      <div
        style={{
          border: "1px solid white",
          padding: "1em",
          marginBottom: "1em",
          flex: 1,
          whiteSpace: "pre",
          overflowX: "auto",
          overflowY: "scroll",
        }}
      >
        <Tree
          value={doc}
          onEvent={({ event, path: eventPath, type }) => {
            const data = path(eventPath, doc);
            switch (type) {
              case EVENTS.COPY:
                return navigator.clipboard.writeText(
                  JSON.stringify(data, null, 2),
                );
              case EVENTS.EXPORT:
                return save(data);
              case EVENTS.IMPORT:
                return load().then((data) =>
                  changeDoc((d) => assocPath(eventPath, data, d)),
                );
              case EVENTS.ADD:
                return;
              case EVENTS.DELETE:
                return;
              case EVENTS.CHANGE_KEY:
                return;
              case EVENTS.CHANGE_VALUE:
                return changeDoc((d) =>
                  assocPath(eventPath, event.target.value, d),
                );
              default:
                return;
            }
          }}
        />
      </div>
    </div>
  );
};
