import { useState } from "react";
import { isValidJSON, EVENTS } from "./helpers";

const Field = ({ value, style, onChange, theme }) => {
  const [intermediateValue, setIntermediateValue] = useState();
  const hasBeenEdited = intermediateValue !== undefined;
  const v = intermediateValue ?? JSON.stringify(value);
  const isValid = isValidJSON(v);
  return (
    <input
      value={v}
      onChange={(event) => setIntermediateValue(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape") setIntermediateValue();
        if (event.key === "Enter" && isValid) {
          onChange(event);
          setIntermediateValue();
        }
      }}
      style={{
        fontFamily: "inherit",
        fontSize: "inherit",
        cursor: "text",
        border: 0,
        padding: 0,
        marginBottom: "1px",
        backgroundColor: "inherit",
        ...style,
        width: `${v.length}ch`,
        outline: !isValid && `2px solid ${theme.error}`,
        color: hasBeenEdited ? theme.intermediate : "inherit",
      }}
    />
  );
};

export const Key = ({ value, onEvent, path, theme, editable }) => {
  if (!editable) {
    return (
      <span
        children={value}
        style={{
          fontWeight: "bold",
          minWidth: "1ch",
        }}
      />
    );
  }
  return (
    <Field
      value={value}
      onChange={(event) => onEvent({ event, path, type: EVENTS.CHANGE_KEY })}
      theme={theme}
      style={{
        fontWeight: "bold",
        minWidth: "1ch",
      }}
    />
  );
};

export const Value = ({ value, onEvent, path, theme }) => {
  return (
    <Field
      value={value}
      onChange={(event) => onEvent({ event, path, type: EVENTS.CHANGE_VALUE })}
      theme={theme}
      style={{
        minWidth: "3ch",
      }}
    />
  );
};
