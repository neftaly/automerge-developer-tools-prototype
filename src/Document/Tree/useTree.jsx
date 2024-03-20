import { create } from "zustand";
import { saveAs } from "file-saver";
import { loadFileFromPrompt, isObject } from "./helpers";
import { compose, init, last, path, assocPath, dissocPath } from "ramda";

export const useTree = create((set, get) => ({
  contextMenu: false,
  hover: false,
  actions: {
    setHover: (path) => (event) => {
      event.stopPropagation(); // Only show 1 guide at a time
      set({ hover: path });
    },
    setContextMenu: (path) => (event) => {
      if (!path) return set({ contextMenu: false });
      if (!document.hasFocus()) return;
      event.preventDefault();
      event.stopPropagation();
      set({
        contextMenu: {
          x: event.clientX,
          y: event.clientY,
          path,
        },
      });
    },
    changeKey: (eventPath, changeDoc) => (event) => {
      // this should be a "move" operation
      changeDoc((d) => {
        const newKey = JSON.parse(event.target.value);
        if (newKey === last(eventPath)) return d; // value didn't change
        const newPath = [...init(eventPath), newKey];
        const value = path(eventPath, d);
        return compose(assocPath(newPath, value), dissocPath(eventPath))(d);
      });
    },
    changeValue: (eventPath, changeDoc) => (event) => {
      // TODO: this should work correctly with arrays
      changeDoc((d) => assocPath(eventPath, JSON.parse(event.target.value), d));
    },
    copyToClipboard: (doc, changeDoc) => () => {
      const eventPath = get().contextMenu.path;
      const data = path(eventPath, doc);
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    },
    pasteFromClipboard: (doc, changeDoc) => (event) => {
      const eventPath = get().contextMenu.path;
      navigator.clipboard
        .readText()
        .then(JSON.parse)
        .then((data) => changeDoc((d) => assocPath(eventPath, data, d)))
        .catch(console.error);
    },
    export: (doc, changeDoc) => () => {
      const eventPath = get().contextMenu.path;
      const data = path(eventPath, doc);
      saveAs(
        new Blob([JSON.stringify(data)], {
          type: "application/json;charset=utf-8",
        }),
        "automerge-export.json",
      );
    },
    import: (doc, changeDoc) => () => {
      const eventPath = get().contextMenu.path;
      loadFileFromPrompt()
        .then((data) => changeDoc((d) => assocPath(eventPath, data, d)))
        .catch((error) => {
          console.error(error);
          alert("Error loading JSON:\n" + error.message);
        });
    },
    delete: (doc, changeDoc) => () => {
      const eventPath = get().contextMenu.path;
      // TODO: this should work correctly with arrays
      if (confirm(`Delete ${eventPath.join(".")}?`))
        changeDoc(dissocPath(eventPath));
    },
    add: (doc, changeDoc) => () => {
      changeDoc((d) => {
        const eventPath = get().contextMenu.path;
        const oldValue = path(eventPath, d);
        if (!isObject(oldValue)) return d;
        const key = Array.isArray(oldValue) ? oldValue.length : prompt("Key?");
        if (!key) return d;
        const newPath = [...eventPath, key];
        if (path(newPath, d) !== undefined) {
          alert(`Error: Key "${key}" already exists`);
          return d;
        }
        return assocPath(newPath, null, d);
      });
    },
  },
}));
