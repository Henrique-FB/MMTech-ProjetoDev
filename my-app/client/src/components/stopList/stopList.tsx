import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import type { Trip } from "../../types/trip.interface";
import * as tripService from "../../services/api/trips.service";
import StopItem from "../stopItem/stopItem";
import "./stopList.css";

export default function TripList({ trip }: { trip: Trip }) {
  const [stops, setStops] = useState(trip.stops);
  const [newStopName, setNewStopName] = useState("");

  useEffect(() => {
    setStops(trip.stops);
  }, [trip]);

  async function handleAddStop() {
    if (!newStopName.trim()) return;
    const newStop = await tripService.addStop(trip.id, 44); // TODO: replace 44 with actual cityId
    setStops([...stops, newStop]);
    setNewStopName("");
  }

  async function handleDeleteStop(stopId: number) {
    console.log('test')
    await tripService.deleteStop(trip.id, stopId);
    setStops((prev) => prev.filter((s) => s.id !== stopId));
    
  }



  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stops.findIndex((s) => s.id === active.id);
    const newIndex = stops.findIndex((s) => s.id === over.id);

    const newStops = arrayMove(stops, oldIndex, newIndex);
    setStops(newStops);

    const newOrder = newStops.map((s) => s.id);
    tripService.reorderStops(trip.id, newOrder);
  }

  return (
    <div className="trip-stops">
      <h3>Stops:</h3>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ul className="stops-list">
            {stops.map((stop) => (
              <StopItem key={stop.id} stop={stop} onDelete={handleDeleteStop} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="add-stop">
        <input
          type="text"
          placeholder="Enter city name"
          value={newStopName}
          onChange={(e) => setNewStopName(e.target.value)}
        />
        <button onClick={handleAddStop}>Add Stop</button>
      </div>
    </div>
  );
}