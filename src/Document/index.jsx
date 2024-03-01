import { useState } from "react";
import { Tree } from "./Tree";
import testdata from "./testdata";
import { EVENTS } from "./Tree";
import { compose, init, last, path, assocPath, dissocPath } from "ramda";
import { save, load } from "./saveload";

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
                return load()
                  .then((data) =>
                    changeDoc((d) => assocPath(eventPath, data, d)),
                  )
                  .catch((error) => {
                    console.error(error);
                    alert("Error loading JSON:\n" + error.message);
                  });
              case EVENTS.ADD:
                return changeDoc((d) => {
                  const oldValue = path(eventPath, d);
                  const key = Array.isArray(oldValue)
                    ? oldValue.length
                    : prompt("Key?");
                  if (!key) return d;
                  const newPath = [...eventPath, key];
                  if (path(newPath, d) !== undefined) {
                    alert(`Error: Key "${key}" already exists`);
                    return d;
                  }
                  return assocPath(newPath, null, d);
                });
              case EVENTS.DELETE:
                // TODO: this should work correctly with arrays
                if (confirm(`Delete ${eventPath.join(".")}?`))
                  changeDoc(dissocPath(eventPath));
                return;
              case EVENTS.CHANGE_KEY:
                // this should be a "move" operation
                return changeDoc((d) => {
                  const newKey = JSON.parse(event.target.value);
                  if (newKey === last(eventPath)) return d; // value didn't change
                  const newPath = [...init(eventPath), newKey];
                  const value = path(eventPath, d);
                  return compose(
                    assocPath(newPath, value),
                    dissocPath(eventPath),
                  )(d);
                });
              case EVENTS.CHANGE_VALUE:
                // TODO: this should work correctly with arrays
                return changeDoc((d) =>
                  assocPath(eventPath, JSON.parse(event.target.value), d),
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
