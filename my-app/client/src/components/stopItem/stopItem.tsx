import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./stopItem.css";

interface StopItemProps {
  stop: any;
  onDelete: (stopId: number) => void;
}

export default function StopItem({ stop, onDelete }: StopItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: stop.id, // must be unique
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //make the

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      className="stop-item"
      style={style}
    >
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div {...listeners} style={{ flex: 1, cursor: "grab" }}>
        <strong>
          {stop.city.name} ({stop.city.uf})
        </strong>
        <div style={{ fontSize: "0.9rem", color: "#4b5563" }}>
          Lat: {stop.city.latitude}, Lon: {stop.city.longitude}
        </div>
      </div>
      <button className="delete-button" onClick={() => onDelete(stop.id)}>x</button>
    </div>
    </li>

  );
}