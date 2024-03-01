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
      margin: "0 2ch 0 2ch",
      display: "inline-block",
      userSelect: "none",
    }}
  >
    <Button
      children="📋"
      title="Copy JSON to clipboard"
      onClick={(event) => onEvent({ event, path, type: EVENTS.COPY })}
    />
    <Button
      children="💾"
      title="Export JSON to file"
      onClick={(event) => onEvent({ event, path, type: EVENTS.EXPORT })}
    />
    <Button
      children="📂"
      title="Import JSON from file"
      onClick={(event) => onEvent({ event, path, type: EVENTS.IMPORT })}
    />
    <Button
      children="❌"
      title="Delete"
      onClick={(event) => onEvent({ event, path, type: EVENTS.DELETE })}
    />
    {isBranch && (
      <>
        <Button
          children="➕"
          title="Add"
          onClick={(event) => onEvent({ event, path, type: EVENTS.ADD })}
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
