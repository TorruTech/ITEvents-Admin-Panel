import { useForm } from "react-hook-form";
import axios from "axios";

function CategoryForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("https://iteventsbackend.onrender.com/api/categories", data);
      alert("Categoría creada");
      reset();
    } catch (error) {
      console.error("Error al crear categoría", error);
      alert("Ocurrió un error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Crear Categoría</h2>
      <input
        {...register("name")}
        placeholder="Nombre de la categoría"
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default CategoryForm;
