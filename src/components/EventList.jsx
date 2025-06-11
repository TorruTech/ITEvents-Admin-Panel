import { useEffect, useState } from "react";
import axios from "axios";

function EventList({ refreshKey, onEdit }) {
  const [events, setEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // check on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://iteventsbackend.onrender.com/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error al obtener eventos", error);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este evento?")) return;
    try {
      await axios.delete(`https://iteventsbackend.onrender.com/api/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar evento", error);
      alert("No se pudo eliminar el evento.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshKey ?? 0]);

  const filteredEvents = selectedCity === "All"
    ? [...events].sort((a, b) => a.name.localeCompare(b.name))
    : [...events]
        .filter((e) => e.location?.name === selectedCity)
        .sort((a, b) => a.name.localeCompare(b.name));

  const uniqueCities = [...new Set(events.map((e) => e.location?.name))].filter(Boolean).sort();

  return (
    <div style={{
      marginTop: "5rem",
      marginBottom: "3rem",
      background: "linear-gradient(to right, #2C1E57, #202458)",
      padding: "2rem",
      borderRadius: "8px",
      color: "white"
    }}>
      <h2>Eventos registrados</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="cityFilter" style={{ marginRight: "0.5rem" }}>Filtrar por ciudad:</label>
        <select
          id="cityFilter"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "4px" }}
        >
          <option value="All">Todas las ciudades</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "1rem 0",
              gap: "1rem"
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{event.name}</strong>
              {!isMobile && (
                <div>{event.dateDescription} ({event.location?.name})</div>
              )}
            </div>

            <div style={{
              display: "flex",
              gap: "0.5rem",
              paddingTop: "0.2rem"
            }}>
              <button
                onClick={() => onEdit(event)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#60a5fa",
                  fontSize: "1.1rem",
                  cursor: "pointer"
                }}
              >
                ✏️
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  cursor: "pointer"
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
