import { useForm } from "react-hook-form";
import axios from "axios";

function EventForm({ onCreate }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("https://iteventsbackend.onrender.com/api/events", data);
      alert("Evento creado");
      reset();
      if (onCreate) onCreate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="eventForm">
      <h2>Crear Evento</h2>
      <input {...register("name")} placeholder="Nombre del evento" required className="eventInput"/>
      <input {...register("description")} placeholder="Descripción" className="eventInput"/>
      <input {...register("dateDescription")} placeholder="Fecha texto" className="eventInput"/>
      <input type="date" {...register("date")} required className="eventInput"/>
      <input {...register("imageUrl")} placeholder="URL de imagen" className="eventInput"/>
      <input type="number" {...register("category.id")} placeholder="ID Categoría" className="eventInput"/>
      <input type="number" {...register("location.id")} placeholder="ID Localización" className="eventInput"/>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default EventForm;