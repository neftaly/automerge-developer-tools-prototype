import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useTree } from "./Tree/useTree";
import { isObject } from "./Tree/helpers";
import { path } from "ramda";

export const ContextMenu = ({ doc, changeDoc }) => {
  const [actions, contextMenu] = useTree((s) => [s.actions, s.contextMenu]);
  if (!contextMenu) return null;
  const isBranch = isObject(path(contextMenu.path, doc));
  return (
    <ControlledMenu
      anchorPoint={{ x: contextMenu.x, y: contextMenu.y }}
      state="open"
      direction="right"
      onClose={actions.setContextMenu(false)}
    >
      <MenuItem onClick={actions.copyToClipboard(doc, changeDoc)}>
        📋 Copy
      </MenuItem>
      <MenuItem onClick={actions.export(doc, changeDoc)}>
        💾 Export JSON
      </MenuItem>
      <MenuItem onClick={actions.import(doc, changeDoc)}>
        📂 Import JSON
      </MenuItem>
      <MenuItem onClick={actions.delete(doc, changeDoc)}>❌ Delete</MenuItem>
      {isBranch && (
        <MenuItem onClick={actions.add(doc, changeDoc)}>➕ Add</MenuItem>
      )}
    </ControlledMenu>
  );
};
