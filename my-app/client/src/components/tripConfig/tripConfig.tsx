import { useState, useRef, useEffect } from "react";
import "./tripConfig.css"

type Props = {
  onDeleteTrip: () => void;
};

export default function TripConfig({ onDeleteTrip }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="trip-config" ref={menuRef}>
      <button
        className="trip-config-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        ⚙️
      </button>

      {open && (
        <div className="trip-config-dropdown">
          <button className="trip-config-item" onClick={onDeleteTrip}>
            Delete Trip
          </button>
        </div>
      )}
    </div>
  );
}
