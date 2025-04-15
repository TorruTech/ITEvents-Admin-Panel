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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear Evento</h2>
      <input {...register("name")} placeholder="Nombre del evento" />
      <input {...register("description")} placeholder="Descripción" />
      <input {...register("dateDescription")} placeholder="Fecha texto" />
      <input type="date" {...register("date")} />
      <input {...register("imageUrl")} placeholder="URL de imagen" />
      <input type="number" {...register("category.id")} placeholder="ID Categoría" />
      <input type="number" {...register("location.id")} placeholder="ID Localización" />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default EventForm;