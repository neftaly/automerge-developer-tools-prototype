const style = {
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  backgroundColor: "transparent",
  cursor: "text",
  border: 0,
  padding: 0,
};

export const Key = ({ value, onEvent, path, editable }) => {
  if (!editable)
    return (
      <span
        style={{
          fontWeight: "bold",
          // cursor: 'ns-resize', // TODO: Array re-ordering by drag-and-drop
        }}
        children={`${value}`}
      />
    );
  const v = JSON.stringify(value);
  return (
    <input
      className="tree-editable-field"
      style={{
        ...style,
        width: `${v.length}ch`,
        fontWeight: "bold",
      }}
      value={v}
      onChange={onEvent}
    />
  );
};

export const Value = ({ value, onEvent, path, theme, error }) => {
  const v = JSON.stringify(value);
  return (
    <input
      className="tree-editable-field"
      style={{
        ...style,
        width: `${v.length}ch`,
        color: error ? theme.error : "inherit",
      }}
      value={v}
      onChange={onEvent}
    />
  );
};
