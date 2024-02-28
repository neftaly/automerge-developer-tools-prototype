import { Tree } from "./Tree";
import testdata from "./testdata";

export const Document = ({ url }) => {
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
        <Tree value={testdata} onEvent={console.info} />
      </div>
    </div>
  );
};
