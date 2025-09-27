import { useState, useEffect } from "react";
import "./tripTitle.css"

export default function TripTitle({ trip, onRename }: { trip: any; onRename: (newName: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(trip.name || `Trip #${trip.id}`);

  useEffect(() => {
    setTitle(trip.name ?? `Trip #${trip.id}`);
    setEditing(false);
  }, [trip]);

  const handleBlur = () => {
    setEditing(false);
    if (title.trim() && title !== trip.name) {
      onRename(title);
    }
  };
  return (
    <>
    <div className = 'test'>
      {editing ? (
        <input
          className="trip-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
        />
      ) : (
        <h2 className="trip-title" onDoubleClick={() => setEditing(true)}>
          {title}
        </h2>
      )}
      </div>
    </>
  );
}