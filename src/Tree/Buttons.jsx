import { useState } from "react";
import { EVENTS } from "./helpers";

const Button = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseOver={(e) => setHover(true)}
      onMouseOut={(e) => setHover(false)}
      style={{
        userSelect: "none",
        opacity: hover ? 1 : 0.7,
        background: "transparent",
        fontFamily: "inherit",
        fontSize: "inherit",
        border: "none",
        padding: 0,
        margin: "0 0 0 1ch",
        cursor: "pointer",
      }}
      {...props}
    />
  );
};

export const Actions = ({ path, isBranch, onEvent }) => (
  <div
    style={{
      marginRight: "1ch",
      display: "inline-block",
      userSelect: "none",
    }}
  >
    <Button
      children="📋"
      title="Copy to clipboard"
      onClick={(event) => onEvent({ event, path, type: EVENTS.COPY })}
    />
    <Button
      children="📂"
      title="Import JSON"
      onClick={(event) => onEvent({ event, path, type: EVENTS.IMPORT })}
    />
    <Button
      children="💾"
      title="Export JSON"
      onClick={(event) => onEvent({ event, path, type: EVENTS.EXPORT })}
    />
    {isBranch && (
      <>
        <Button
          children="➕"
          title="Add"
          onClick={(event) => onEvent({ event, path, type: EVENTS.ADD })}
        />
        <Button
          children="❌"
          title="Delete"
          onClick={(event) => onEvent({ event, path, type: EVENTS.DELETE })}
        />
      </>
    )}
  </div>
);

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
