import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function EventForm({ onCreate, eventToEdit, cancelEdit }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("https://iteventsbackend.onrender.com/api/categories");
        const locRes = await axios.get("https://iteventsbackend.onrender.com/api/locations");
        setCategories(catRes.data);
        setLocations(locRes.data);
      } catch (error) {
        console.error("Error al cargar categorías o localizaciones", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (eventToEdit) {
      setValue("name", eventToEdit.name);
      setValue("description", eventToEdit.description);
      setValue("dateDescription", eventToEdit.dateDescription);
      setValue("date", eventToEdit.date);
      setValue("imageUrl", eventToEdit.imageUrl);
      setValue("categoryId", eventToEdit.category?.id);
      setValue("locationId", eventToEdit.location?.id);
    } else {
      reset(); 
    }
  }, [eventToEdit, setValue, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      category: { id: parseInt(data.categoryId) },
      location: { id: parseInt(data.locationId) }
    };

    try {
      if (eventToEdit) {
        await axios.put(`https://iteventsbackend.onrender.com/api/events/${eventToEdit.id}`, payload);
        alert("Evento actualizado");
      } else {
        await axios.post("https://iteventsbackend.onrender.com/api/events", payload);
        alert("Evento creado");
      }

      reset();
      if (onCreate) onCreate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-300">
      <h2>{eventToEdit ? "Editar Evento" : "Crear Evento"}</h2>

      <input {...register("name")} placeholder="Nombre del evento" required className="eventInput" />
      <input {...register("description")} placeholder="Descripción" className="eventInput" />
      <input {...register("dateDescription")} placeholder="Fecha texto" className="eventInput" />
      <input type="date" {...register("date")} required className="eventInput" />
      <input {...register("imageUrl")} placeholder="URL de imagen" className="eventInput" />

      <select {...register("categoryId")} required>
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select {...register("locationId")} required>
        <option value="">Selecciona una ciudad</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      <br />
      <button type="submit">{eventToEdit ? "Actualizar" : "Guardar"}</button>
      {eventToEdit && (
        <button type="button" className="ml-2" onClick={() => {
          reset();
          if (cancelEdit) cancelEdit(); 
        }}>
          Limpiar
        </button>        
      )}
    </form>
  );
}

export default EventForm;
