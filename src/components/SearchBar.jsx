

import "./SearchBar.css";
import { useState } from "react";

function SearchBar({ onSearch, currentCity }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    onSearch(city.trim());
    setCity("");
  };

  return (
    <div className="search-wrapper">

      {/* Search Form */}
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* City Result Box */}
      {currentCity && (
        <div className="city-box">
          <span className="location-icon">📍</span>
          <span>{currentCity}</span>
        </div>
      )}

    </div>
  );
}

export default SearchBar;