import { useState, useEffect, useRef } from "react";
import * as cityService from "../../services/api/cities.service";
import "./addStop.css"

interface AddStopProps {
  onAdd: (cityId: number) => void;
}

export default function AddStop({ onAdd }: AddStopProps) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<{ id: number; name: string; uf: string;}[]>([]);
  const [filteredCities, setFilteredCities] = useState<typeof cities>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCities() {
      const result = await cityService.getCities();
      setCities(result);
    }
    fetchCities();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredCities([]);
      return;
    }
    const matches = cities
      .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFilteredCities(matches);
  }, [query, cities]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cityId: number) => {
    onAdd(cityId);
    setQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="add-stop" ref={containerRef}>
      <input
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && filteredCities.length > 0 && (
        <ul className="autocomplete-list">
          {filteredCities.map((city) => (
            <li key={city.id} onClick={() => handleSelect(city.id)}>
              {city.name}({city.uf})
            </li>
          ))}
        </ul>
      )}
      </div>
  );
}
