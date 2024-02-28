import { useState } from "react";
import { Actions, ExpandButton } from "./Buttons";
import { isObject, isString, isValidJSON, EVENTS } from "./helpers";
import { Key, Value } from "./Fields";

const Node = ({ name, value, path, theme, onEvent, canKeyBeEdited }) => {
  const [expanded, setExpanded] = useState(true);
  const expandable = isObject(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];
  const [hover, setHover] = useState(false);
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
          path={path}
          editable={canKeyBeEdited}
          onEvent={(event) => onEvent({ event, path, type: EVENTS.CHANGE_KEY })}
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
          <Value
            value={value}
            onEvent={(event) =>
              onEvent({ event, path, type: EVENTS.CHANGE_VALUE })
            }
            path={path}
            theme={theme}
            error={!isValidJSON(value)}
          />
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
  return Object.entries(value).map(([name, v], key) => (
    <Node
      key={key}
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
    error: "red",
    expandButton: "white",
    ...t,
  };
  return (
    <div
      style={{
        fontFamily: "monospace",
        marginLeft: `-${theme.indent}`,
        cursor: "default",
        ...style,
      }}
    >
      <Node path={path} value={value} theme={theme} onEvent={onEvent} />
    </div>
  );
};
