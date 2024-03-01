import { useState } from "react";
import { Tree } from "./Tree";
import testdata from "./testdata";
import { EVENTS } from "./Tree";
import { path, assocPath } from "ramda";
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
                const key = prompt("Key?");
                if (key) {
                  console.log("Add", key, "to", eventPath);
                }
                return;
              case EVENTS.DELETE:
                if (confirm(`Delete ${eventPath.join(".")}?`)) {
                  console.log("delete", eventPath);
                }
                return;
              case EVENTS.CHANGE_KEY:
                console.log("rename", eventPath, "to", event.target.value);
                return;
              case EVENTS.CHANGE_VALUE:
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
