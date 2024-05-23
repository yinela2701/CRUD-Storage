import { storage } from "./firebase";
import { ref, getDownloadURL, getStorage, deleteObject, uploadBytes } from "firebase/storage";



async function getImageUrlByName(name) {
  const imagesRef = ref(storage, `images/${name}`);
  let response = await getDownloadURL(imagesRef);
  return response;
}

async function deleteImageUrlByName(name) {

  const desertRef = ref(storage, `images/${name}`);
  try {
    await deleteObject(desertRef); // Delete the file
    console.log(`Imagen ${name} eliminada con éxito.`);
    return { success: true, message: `Imagen ${name} eliminada con éxito.` };
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    return { success: false, message: 'Error al eliminar la imagen.' };
  }
}

//Subir imagen 

async function uploadImage(file, name) {

  const storageRef = ref(storage, `images/${name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

async function updateImage(file, name) {

  const storageRef = ref(storage, `images/${name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

export { getImageUrlByName, uploadImage, deleteImageUrlByName, updateImage };

