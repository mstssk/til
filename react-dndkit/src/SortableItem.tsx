import { FC, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem: FC<{ id: string }> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStyle: CSSProperties = {
    background: "none",
    borderColor: "transparent",
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td>
        <button {...attributes} {...listeners} style={handleStyle}>
          <span className="material-icons">drag_handle</span>
        </button>
      </td>
      <td>
        <span>{props.children}</span>
      </td>
    </tr>
  );
};
