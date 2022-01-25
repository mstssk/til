import { CSSProperties, FC, useRef, useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
  MeasuringStrategy,
  getClientRect,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Item = { id: string; width: number };
const data: Item[] = [];
for (let index = 0; index < 10; index++) {
  data[index] = {
    id: `${index}`,
    width: Math.random() * 300,
  };
}

export function HorizontalDrag() {
  const scrollContainerRef = useRef<HTMLDivElement>();
  const [items, setItems] = useState(data);
  const [activeItem, setActiveItem] = useState<Item>(null);
  const [clickedPosition, setClickedPosition] = useState(0);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const elem = scrollContainerRef.current;
    const handlwWheel = (event: WheelEvent) => {
      if (event.deltaY) {
        event.preventDefault();
        elem.scrollBy({ left: event.deltaY });
      }
    };
    elem.addEventListener("wheel", handlwWheel);
    return () => elem.removeEventListener("wheel", handlwWheel);
  }, []);

  return (
    <DndContext
      onDragStart={(e) => {
        setActiveItem(items.find((i) => i.id === e.active.id));
        // console.group(new Date());
        console.log("onDragStart", e);
      }}
      onDragMove={(e) => {
        console.log("onDragMove", e);
      }}
      onDragEnd={(e) => {
        setActiveItem(null);
        // console.log("onDragEnd", e.delta);
        // console.groupEnd();
        const { active, over } = e;
        if (active.id !== over.id) {
          console.debug(active, over);
          setItems((items) => {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}
      sensors={sensors}
      // measuring={{
      //   draggable: { measure: getClientRect },
      //   droppable: { strategy: MeasuringStrategy.Always },
      //   dragOverlay: { measure: getClientRect },
      // }}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div
          ref={scrollContainerRef}
          style={{
            display: "flex",
            width: 600,
            // overflowY: "clip",
            overflowX: "scroll",
          }}
        >
          {items.map((item, index) => (
            <Sortable
              key={index}
              id={item.id}
              width={item.width}
              onPointerDown={setClickedPosition}
            >
              {Math.floor(item.width)}
            </Sortable>
          ))}
        </div>
        <DragOverlay>
          {activeItem && (
            <OverlayItem {...activeItem} x={clickedPosition}>
              {Math.floor(activeItem.width)}
            </OverlayItem>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
}

const Sortable: FC<{
  id: string;
  width: number;
  onPointerDown: (x: number) => void;
}> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id: props.id });

  const style: CSSProperties = {
    flex: "0 0 auto",
    border: "1px solid tomato",
    width: isSorting ? 100 : props.width,
    height: 70,
    overflow: "hidden",
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isSorting ? "grabbing" : "grab",
  };

  // console.log(listeners);
  const { onPointerDown } = listeners;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => {
        // console.log(
        //   e.currentTarget.getBoundingClientRect().left,
        //   e.clientX,

        // );
        props.onPointerDown(
          e.clientX - e.currentTarget.getBoundingClientRect().left
        );
        return onPointerDown(e);
      }}
      style={style}
    >
      {props.children}
    </div>
  );
};

const OverlayItem: FC<{ id: string; width: number; x: number }> = (props) => {
  const width = 100;
  const style: CSSProperties = {
    flex: "0 0 auto",
    border: "1px solid tomato",
    width,
    height: 70,
    overflow: "hidden",
    cursor: "grabbing",
    background: "white",
    transform: `translateX(calc(${props.x}px - 50%))`,
    // transform: `translateX(calc(${props.width - width}px + 50%))`,
    // transform: CSS.Transform.toString({
    //   x: props.width,
    //   y: null,
    //   scaleX: null,
    //   scaleY: null,
    // }),
  };
  // console.log(style.transform);

  return <div style={style}>{props.children}</div>;
};
