import { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import "./mapLegend.css";

type TripLegendProps = {
  distances: number[];
  durations: number[];
};

export function TripLegend({ distances, durations }: TripLegendProps) {
  const map = useMap();

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return h > 0 ? `${h} h ${m} min` : `${m} min`;
  };

  useEffect(() => {
    const existingLegend = document.querySelector(".trip-legend")?.parentElement;
    if (existingLegend) existingLegend.remove();

    const LegendControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create("div", "trip-legend");

        const title = document.createElement("h4");
        title.textContent = "Trip Overview";
        title.className = "trip-legend-title";
        div.appendChild(title);

        distances.forEach((distance, i) => {
          const distanceKm = (distance / 1000).toFixed(1);
          const durationText = formatDuration(durations[i]);

          const legDiv = document.createElement("div");
          legDiv.className = "trip-legend-leg";

          const textSpan = document.createElement("span");
          textSpan.textContent =
            i === 0
              ? `Full Trip: ${durationText}, ${distanceKm} km`
              : `Part ${i}: ${durationText}, ${distanceKm} km`;

          legDiv.appendChild(textSpan);
          div.appendChild(legDiv);
        });
        return div;
      },
    });
    const legend = new LegendControl({ position: "bottomleft" });
    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map, distances, durations]);

  return null;
}
