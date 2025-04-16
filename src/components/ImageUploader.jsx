import { useState } from "react";
import axios from "axios";
import { useFormContext } from "react-hook-form"; 

function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { setValue, watch } = useFormContext();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "itevents-upload");
    setUploading(true);

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dcqf25p9j/image/upload", formData);
      const imageUrl = res.data.secure_url;
      setValue("imageUrl", imageUrl); 
      setPreviewUrl(imageUrl);
      alert("Imagen subida con éxito ✅");
    } catch (err) {
      console.error("Error al subir la imagen", err);
      alert("Error al subir la imagen ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
        <label
            htmlFor="fileInput"
            style={{
                display: "inline-block",
                backgroundColor: "#646cff",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                margin: "5px 0",
            }}
        >
        Subir imagen
        </label>

        <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        />
        {uploading && <p>Subiendo imagen...</p>}
        {watch("imageUrl") && (
            <img src={watch("imageUrl")} alt="Preview" style={{ width: "200px", margin: "5px 0"}} />
        )}
        </div>
  );
}

export default ImageUploader;
