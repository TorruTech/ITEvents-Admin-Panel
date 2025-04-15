import { useForm } from "react-hook-form";
import axios from "axios";

function LocationForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("https://iteventsbackend.onrender.com/api/locations", data);
      alert("Localización creada");
      reset();
    } catch (error) {
      console.error("Error al crear localización", error);
      alert("Ocurrió un error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Crear Localización</h2>
      <input
        {...register("name")}
        placeholder="Nombre de la ciudad"
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default LocationForm;
