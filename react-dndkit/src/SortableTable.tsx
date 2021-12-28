import { FC, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

export function SortableTable() {
  const [items, setItems] = useState(["1", "2", "3", "4", "5"]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <table style={{ borderCollapse: "collapse" }}>
          <thead style={{ borderBottom: "1px solid black" }}>
            <tr>
              <th></th>
              <th>No.</th>
            </tr>
          </thead>
          <tbody>
            {items.map((id) => (
              <SortableItem key={id} id={id}>
                {id}
              </SortableItem>
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over.id) {
      console.debug(active, over);
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

const SortableItem: FC<{ id: string }> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style: CSSProperties = {
    height: `${Number(props.id)}0px`,
    border: "1px solid tomato",
    transform: transform
      ? CSS.Transform.toString({ ...transform, scaleX: 1, scaleY: 1 })
      : null,
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
