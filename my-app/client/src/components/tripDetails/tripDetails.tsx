import React, {useState, useEffect}  from "react";
import "./tripDetails.css"
import type { Trip } from "../../types/trip.interface";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import type {  DragEndEvent } from "@dnd-kit/core";

import { reorderStops } from "../../services/trips.service";

interface Props {
  trip: Trip | null;
}



function StopItem({ stop }: { stop: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: stop.city.name, // must be unique
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="stop-item"
      style={style}
    >
      <strong>
        {stop.city.name} ({stop.city.uf})
      </strong>
      <div style={{ fontSize: "0.9rem", color: "#4b5563" }}>
        Lat: {stop.city.latitude}, Lon: {stop.city.longitude}
      </div>
      
    </li>
  );
}



export default function TripDetails({ trip }: Props) {

  const [stops, setStops] = useState(trip?.stops || []);

  useEffect(() => {
    if (trip) {
      setStops(trip.stops);
    }
  }, [trip]);


  const sensors = useSensors(useSensor(PointerSensor));


  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stops.findIndex((s) => s.city.name === active.id);
    const newIndex = stops.findIndex((s) => s.city.name === over.id);

    const newStops = arrayMove(stops, oldIndex, newIndex);
    setStops(newStops);

    const newOrder = newStops.map((s) => s.id);
    console.log(newOrder, trip!.id);
    reorderStops(trip!.id, newOrder);

  }



  if (!trip) {
    return (
      <div className="empty-trip">
        <h2>No trip selected</h2>
        <p>Please choose a trip from the list on the left.</p>
      </div>
    );
  }



return (
  <div className="trip-details">
    <h2 className="trip-title">Trip #{trip.id}</h2>

    <div className="trip-description">
      <p>Number of stops: {stops.length}</p>
    </div>

    <div className="trip-main">
      <div className="trip-map">
        {/* Your map component/library goes here */}
      </div>

      <div className="trip-stops">
        <h3>Stops:</h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={stops.map((s) => s.city.name)} strategy={verticalListSortingStrategy}>
            <ul className="stops-list">
              {stops.map((stop) => (
                <StopItem key={stop.city.name} stop={stop} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  </div>
);


}