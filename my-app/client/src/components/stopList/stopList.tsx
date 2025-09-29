import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import type { Stop } from "../../types/trip.interface";

import type { Trip } from "../../types/trip.interface";
import * as tripService from "../../services/api/trips.service";
import StopItem from "../stopItem/stopItem";
import AddStop from "../addStop/addStop";
import "./stopList.css";

export default function TripList({ trip, stops, setStops, encodedRoute, setEncodedRoute }: { trip: Trip; stops: Stop[]; setStops: React.Dispatch<React.SetStateAction<Stop[]>>; encodedRoute: string; setEncodedRoute: React.Dispatch<React.SetStateAction<string>> }) {

  useEffect(() => {
    setStops(trip.stops);
  }, [trip]);

  async function handleAddStop( cityId: number) {
    const newStop = await tripService.addStop(trip.id, cityId).then((res) => {
          tripService.getTripPath(trip.id).then((res) => setEncodedRoute(res.points));
          return res;
    });
    setStops([...stops, newStop]);
  }

  async function handleDeleteStop(stopId: number) {
    await tripService.deleteStop(trip.id, stopId).then(() => {
          tripService.getTripPath(trip.id).then((res) => setEncodedRoute(res.points));
    });
    setStops((prev) => prev.filter((s) => s.id !== stopId));
  }


  async function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stops.findIndex((s) => s.id === active.id);
    const newIndex = stops.findIndex((s) => s.id === over.id);

    const newStops = arrayMove(stops, oldIndex, newIndex);
    const newOrder = newStops.map((s) => s.id);

    // Run setStops only after the API call is successful

    tripService.reorderStops(trip.id, newOrder).then(() => {
          tripService.getTripPath(trip.id).then((res) => setEncodedRoute(res.points));
    });
    setStops((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  return (
    <div className="trip-stops">
      <h3>Stops:</h3>
      <AddStop onAdd={handleAddStop} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ul className="stops-list">
            {stops.map((stop) => (
              <StopItem key={stop.id} stop={stop} onDelete={handleDeleteStop} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>


    </div>
  );
}