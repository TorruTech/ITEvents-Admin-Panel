import { useState } from "react";
import EventForm from "../components/EventForm";
import CategoryForm from "../components/CategoryForm";
import LocationForm from "../components/LocationForm";
import EventList from "../components/EventList";
import Footer from "../components/Footer";

function Dashboard() {

    const [refreshKey, setRefreshKey] = useState(0);

    const handleEventCreated = () => {
        setRefreshKey((prev) => prev + 1); 
    };

    return (
        <>
            <div id="mainContainer">
                <div id="dashboardContainer">
                    <h1 className="gradient-title">Panel de Administración</h1>
                    <EventForm onCreate={handleEventCreated} />
                    <CategoryForm />
                    <LocationForm />
                    <EventList refreshKey={refreshKey} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
