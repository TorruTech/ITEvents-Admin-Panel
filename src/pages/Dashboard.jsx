import { useState } from "react";
import EventForm from "../components/EventForm";
import CategoryForm from "../components/CategoryForm";
import LocationForm from "../components/LocationForm";
import EventList from "../components/EventList";
import Footer from "../components/Footer";

function Dashboard() {

    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventCreated = () => {
        setRefreshKey((prev) => prev + 1); 
    };

    return (
        <>
            <div id="mainContainer">
                <div id="dashboardContainer" className="max-w-320">
                    <h1 className="gradient-title my-10">Panel de Administración</h1>
                    <EventForm onCreate={handleEventCreated} eventToEdit={selectedEvent} cancelEdit={() => setSelectedEvent(null)}/>
                    <CategoryForm />
                    <LocationForm />
                    <EventList refreshKey={refreshKey} onEdit={setSelectedEvent}/>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
