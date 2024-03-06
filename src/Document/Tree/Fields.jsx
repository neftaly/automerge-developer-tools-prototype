import { useState } from "react";
import { isValidJSON, EVENTS } from "./helpers";

const ErrorMessage = ({ theme }) => (
  <span style={{ marginLeft: "2ch", color: theme.error }}>
    Invalid JSON{" "}
    <a
      href="https://www.w3schools.com/js/js_json_datatypes.asp"
      target="_blank"
      style={{
        color: theme.background,
        backgroundColor: theme.error,
        borderRadius: "1ch",
        width: "2ch",
        textAlign: "center",
        display: "inline-block",
      }}
    >
      ?
    </a>
  </span>
);

const Field = ({ value, style, onChange, theme, allowEmptyStrings }) => {
  const [intermediateValue, setIntermediateValue] = useState();
  const hasBeenEdited = intermediateValue !== undefined;
  const v = intermediateValue ?? JSON.stringify(value);
  const isValid = isValidJSON(v) && (allowEmptyStrings || v !== '""');
  return (
    <>
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
          backgroundColor: "inherit",
          width: `${v.length}ch`,
          ...style,
          outline: !isValid && `2px solid ${theme.error}`,
          color: hasBeenEdited ? theme.intermediate : "inherit",
        }}
      />
      {!isValid && <ErrorMessage theme={theme} />}
    </>
  );
};

export const Key = ({ value, onChange, theme, editable }) => {
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
      onChange={onChange}
      theme={theme}
      style={{
        fontWeight: "bold",
        minWidth: "1ch",
      }}
    />
  );
};

export const Value = ({ value, onChange, theme }) => {
  return (
    <Field
      value={value}
      onChange={onChange}
      theme={theme}
      style={{
        minWidth: "20ch",
      }}
      allowEmptyStrings
    />
  );
};
