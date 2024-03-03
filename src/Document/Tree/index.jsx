import { useState } from "react";
import { ExpandButton } from "./ExpandButton";
import { isObject, isString, EVENTS } from "./helpers";
import { Key, Value } from "./Fields";
import { useTree } from "./useTree";
import { equals } from "ramda";

export { EVENTS };

const Node = ({ name, value, path, theme, canKeyBeEdited }) => {
  const [expanded, setExpanded] = useState(true);
  const [hoverPath, contextMenuPath, actions] = useTree((s) => [
    s.hover,
    s.contextMenu.path,
    s.actions,
  ]);
  const expandable = isObject(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];
  const isContextMenuOpen = equals(contextMenuPath, path);
  const isHovering = equals(hoverPath, path);
  return (
    <div
      style={{
        position: "relative",
        marginLeft: `calc(${theme.indent} - ${theme.guide[0]})`,
        backgroundColor: isContextMenuOpen && theme.selection,
        borderLeft: `${theme.guide[0]} ${theme.guide[1]} ${
          isHovering ? theme.guide[2] : "transparent"
        }`,
      }}
      onContextMenu={actions.setContextMenu(path)}
      onMouseOver={actions.setHover(path)}
      onMouseOut={actions.setHover(false)}
    >
      {expandable && (
        <ExpandButton
          theme={theme}
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {name && (
        <Key value={name} path={path} theme={theme} editable={canKeyBeEdited} />
      )}
      {name && ": "}
      {expandable && openBracket}
      {expanded &&
        (expandable ? (
          <Branch value={value} path={path} theme={theme} />
        ) : (
          <Value value={value} path={path} theme={theme} />
        ))}
      {expandable && !expanded && "..."}
      {expandable && closeBracket}
    </div>
  );
};

const Branch = ({ path, value, theme }) => {
  const isArray = Array.isArray(value);
  return Object.entries(value).map(([name, v]) => (
    <Node
      key={name}
      name={name}
      value={v}
      theme={theme}
      path={[...path, name]}
      canKeyBeEdited={!isArray}
    />
  ));
};

export const Tree = ({ value, style, path = [], theme: t }) => {
  const theme = {
    background: "black",
    indent: "2ch",
    guide: ["1px", "dotted", "white"],
    expandButton: "white",
    intermediate: "aqua",
    selection: "#444",
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
      <Node path={path} value={value} theme={theme} />
    </div>
  );
};
