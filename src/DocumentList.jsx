import randomColor from "randomcolor";
import invert from "invert-color";
import { __, concat, take, compose } from "ramda";

// Shorten URL
const truncate = compose(concat(__, "..."), take(14));

// Generate random color for URL
const getColor = (url) =>
  randomColor({
    seed: url,
    luminosity: "light",
  });

// Generate background color for selected URL
const getBackgroundColor = (url) => invert(getColor(url)); // Invert color

// Individual clickable URL
const DocumentUrl = ({ url, isSelected, onClick }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        return onClick(url);
      }}
      style={{
        display: "block",
        padding: "0.5em 0 0.5em 0",
        color: getColor(url),
      }}
      href="#"
    >
      <div
        style={{
          padding: "2px",
          margin: "-2px",
          backgroundColor: isSelected && getBackgroundColor(url),
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
