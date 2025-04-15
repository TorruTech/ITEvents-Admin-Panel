import { useState } from "react";
import EventForm from "../components/EventForm";
import CategoryForm from "../components/CategoryForm";
import LocationForm from "../components/LocationForm";
import EventList from "../components/EventList";

function Dashboard() {

    const [refreshKey, setRefreshKey] = useState(0);

    const handleEventCreated = () => {
        setRefreshKey((prev) => prev + 1); 
    };

    return (
        <div id="dashboardContainer">
            <h1>Panel de Administración</h1>
            <EventForm onCreate={handleEventCreated} />
            <CategoryForm />
            <LocationForm />
            <EventList refreshKey={refreshKey} />
        </div>
    );
}

export default Dashboard;
