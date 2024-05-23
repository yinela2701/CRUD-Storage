import { useState, useEffect } from "react";
import "./App.css";
import {
  readUsers,
  addUser,
  readUserById,
  customDoc,
  customCollection,
  deleteById,
} from "./core/service/firebase/db/users";
import { listenFeaturesFlags } from "./core/service/firebase/db/config";
import { signIn, signUp } from "./core/service/firebase/auth";
import { getImageUrlByName, uploadImage, deleteImageUrlByName } from "./core/service/firebase/storage";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "pink",
    },
  },
});

function App() {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <div>
        <input type="text" id="imageName-input" />
        <input type="file" id="file-input" />
      </div>
      <Box sx={{ mb: 2 }} />
      <Button
        onClick={async () => {
          const imageName = document.getElementById('imageName-input').value;
          let response = await getImageUrlByName(imageName);
          window.open(response);
        }}
        variant="contained"
      >
        Get Image
      </Button>

      <Box sx={{ mb: 2 }} />

      <Button
        onClick={async () => {
          const imageName = document.getElementById('imageName-input').value;
          let response = await deleteImageUrlByName(imageName);
          console.log(response.message);
        }}
        variant="contained"
      >
        Delete Image
      </Button>

      <Box sx={{ mb: 2 }} />
      
      <Button
        onClick={async () => {
          const input = document.getElementById('file-input');
          const file = input.files[0]; // Obtener el primer archivo seleccionado

          // Llamar a la función uploadImage para subir la imagen
          const downloadURL = await uploadImage(file, file.name);
          console.log('URL de descarga de la imagen:', downloadURL);
        }}
        variant="contained"
      >
        Subir imagen
      </Button>

      <Box sx={{ mb: 2 }} />

      <Button
        onClick={async () => {
          const imageName = document.getElementById('imageName-input').value;
          const input = document.getElementById('file-input');
          const file = input.files[0]; // Obtener el primer archivo seleccionado

          // Llamar a la función uploadImage para subir la imagen
          const downloadURL = await uploadImage(file, imageName);
          console.log('URL de descarga de la imagen:', downloadURL);
        }}
        variant="contained"
      >
        Actualizar Imagen
      </Button>

      
    </div>
  );
}

export default App;
