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
    <div ref={setNodeRef} style={style}>
      <button {...attributes} {...listeners} style={handleStyle}>
        ☰
      </button>
      <span>{props.children}</span>
    </div>
  );
};
