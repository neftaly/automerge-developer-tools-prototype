import { useState } from "react";
import { ExpandButton } from "./ExpandButton";
import { isObject, isString, EVENTS } from "./helpers";
import { Key, Value } from "./Fields";
import { useTree } from "./useTree";
import { equals, isEmpty } from "ramda";

export { EVENTS };

const Node = ({ name, value, path, theme, canKeyBeEdited, changeDoc }) => {
  const [expanded, setExpanded] = useState(true);
  const [hoverPath, contextMenuPath, actions] = useTree((s) => [
    s.hover,
    s.contextMenu.path,
    s.actions,
  ]);
  const expandable = isObject(value) && !isEmpty(value);
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
        <Key
          value={name}
          theme={theme}
          editable={canKeyBeEdited}
          onChange={actions.changeKey(path, changeDoc)}
        />
      )}
      {name && ": "}
      {expandable && openBracket}
      {expanded &&
        (expandable ? (
          <Branch
            value={value}
            path={path}
            theme={theme}
            changeDoc={changeDoc}
          />
        ) : (
          <Value
            value={value}
            theme={theme}
            onChange={actions.changeValue(path, changeDoc)}
          />
        ))}
      {expandable && !expanded && "..."}
      {expandable && closeBracket}
    </div>
  );
};

const Branch = ({ path, value, theme, changeDoc }) => {
  const isArray = Array.isArray(value);
  return Object.entries(value).map(([name, v]) => (
    <Node
      key={name}
      name={name}
      value={v}
      theme={theme}
      path={[...path, name]}
      canKeyBeEdited={!isArray}
      changeDoc={changeDoc}
    />
  ));
};

export const Tree = ({ doc, style, path = [], theme: t, changeDoc }) => {
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
      <Node path={path} value={doc} theme={theme} changeDoc={changeDoc} />
    </div>
  );
};
