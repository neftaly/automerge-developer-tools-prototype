import randomColor from "randomcolor";
import invert from "invert-color";
import { __, concat, take, compose } from "ramda";
import { getLinkUrl } from "./useStore";
import { useMemo } from "react";

// Shorten URL
const truncate = compose(concat(__, "..."), take(16));

// Generate random color for URL
const getColor = (url) =>
  randomColor({
    seed: url,
    luminosity: "light",
  });

// Individual clickable URL
const DocumentUrl = ({ url, isSelected, onClick }) => {
  const linkUrl = useMemo(() => getLinkUrl(url), [url]);
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        return onClick(url);
      }}
      style={{
        display: "block",
        padding: "0.5em 0 0.5em 0",
        color: isSelected ? "white" : getColor(url),
      }}
      href={linkUrl}
    >
      <div
        style={{
          padding: "2px",
          margin: "-2px",
          backgroundColor: isSelected && "#444",
        }}
      >
        "{truncate(url)}"
      </div>
    </a>
  );
};

// List of automerge documents detected on page
export const DocumentList = ({ urls, selectedUrl, onClick, style }) => {
  if (urls.length === 0) {
    return <div style={style}>No documents detected</div>;
  }
  return (
    <div style={style}>
      <div style={{ marginBottom: "0.5em" }}>Detected documents:</div>
      {urls.map((url, key) => (
        <DocumentUrl
          key={key}
          url={url}
          isSelected={url === selectedUrl}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
