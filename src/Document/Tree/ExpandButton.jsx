import { useState } from "react";

export const ExpandButton = ({ expanded, onClick, theme }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        width: 0,
        marginLeft: "-1ch",
      }}
    >
      <button
        onMouseOver={(e) => setHover(true)}
        onMouseOut={(e) => setHover(false)}
        children={expanded ? "▾" : "▸"}
        style={{
          userSelect: "none",
          opacity: hover ? 1 : 0.7,
          backgroundColor: "transparent",
          fontFamily: "inherit",
          fontSize: "inherit",
          border: 0,
          padding: 0,
          margin: 0,
          color: theme.expandButton,
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    </div>
  );
};
