import { useState } from "react";
import { Actions, ExpandButton } from "./Buttons";
import { isObject, isString, EVENTS } from "./helpers";
import { Key, Value } from "./Fields";

export { EVENTS };

const Node = ({ name, value, path, theme, onEvent, canKeyBeEdited }) => {
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const expandable = isObject(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];
  return (
    <div
      style={{
        position: "relative",
        marginLeft: `calc(${theme.indent} - ${theme.guide[0]})`,
        borderLeft: `${theme.guide[0]} ${theme.guide[1]} ${
          hover ? theme.guide[2] : "transparent"
        }`,
      }}
      onMouseOver={(e) => {
        setHover(true);
        e.stopPropagation(); // Only show 1 guide at a time
      }}
      onMouseOut={(e) => setHover(false)}
    >
      {expandable && (
        <ExpandButton
          theme={theme}
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {name && (
        <Key
          value={name}
          onEvent={onEvent}
          path={path}
          theme={theme}
          editable={canKeyBeEdited}
        />
      )}
      {name && ": "}
      {expandable && openBracket}
      {expanded && expandable && hover && (
        <Actions path={path} onEvent={onEvent} isBranch />
      )}
      {expanded &&
        (expandable ? (
          <Branch value={value} path={path} theme={theme} onEvent={onEvent} />
        ) : (
          <Value value={value} onEvent={onEvent} path={path} theme={theme} />
        ))}
      {expandable && !expanded && "..."}
      {!expandable && hover && <Actions path={path} onEvent={onEvent} />}
      {expandable && closeBracket}
      {expandable && !expanded && hover && (
        <Actions path={path} onEvent={onEvent} />
      )}
    </div>
  );
};

const Branch = ({ path, value, theme, onEvent }) => {
  const isArray = Array.isArray(value);
  return Object.entries(value).map(([name, v]) => (
    <Node
      key={name}
      name={name}
      value={v}
      theme={theme}
      path={[...path, name]}
      onEvent={onEvent}
      canKeyBeEdited={!isArray}
    />
  ));
};

export const Tree = ({ value, style, path = [], theme: t, onEvent }) => {
  const theme = {
    indent: "2ch",
    guide: ["1px", "dotted", "white"],
    expandButton: "white",
    intermediate: "aqua",
    error: "salmon",
    ...t,
  };
  return (
    <div
      style={{
        fontFamily: "monospace",
        marginLeft: `-${theme.indent}`,
        ...style,
      }}
    >
      <Node path={path} value={value} theme={theme} onEvent={onEvent} />
    </div>
  );
};
