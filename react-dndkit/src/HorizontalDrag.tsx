import { CSSProperties, FC, useRef, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function HorizontalDrag() {
  const scrollContainerRef = useRef<HTMLDivElement>();
  const [items, setItems] = useState(["1", "2", "3", "4", "5"]);
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      onDragStart={(e) => {
        console.group(new Date());
        console.log("onDragStart", e.active);
      }}
      onDragMove={(e) => {
        console.log(
          "onDragMove",
          // e.delta,
          e.delta.x - scrollContainerRef.current.scrollLeft
        );
      }}
      onDragEnd={(e) => {
        console.log("onDragEnd", e.delta);
        console.groupEnd();
      }}
      sensors={sensors}
    >
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          width: 300,
          overflowY: "clip",
          overflowX: "scroll",
        }}
      >
        {items.map((item) => (
          <Draggable key={item} id={item}>
            {`#${item}`}
          </Draggable>
        ))}
      </div>
    </DndContext>
  );
}

const Draggable: FC<{ id: string }> = (props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
      attributes: { role: "slider" },
    });

  const style: CSSProperties = {
    flex: "0 0 auto",
    border: "1px solid tomato",
    width: 200,
    transform: CSS.Transform.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {props.children}
    </div>
  );
};
