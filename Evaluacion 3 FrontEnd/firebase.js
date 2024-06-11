// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
//librería que permite utilizar funciones
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN:
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ1qPBMlRIzA_It7-DTCWgE8lAZ9LMyUg",
    authDomain: "evaluacion-3-frontend.firebaseapp.com",
    projectId: "evaluacion-3-frontend",
    storageBucket: "evaluacion-3-frontend.appspot.com",
    messagingSenderId: "806546196004",
    appId: "1:806546196004:web:fc68200767041fa71e3ab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//función de firestore que retorna la base de datos para ser utilizada
const db = getFirestore(app);

//función para guardar un registro
export const save = (game) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que permite recibir la base de datos y el nombre de la colección
    addDoc(collection(db, 'juegos'), game)
}
//función para listar todos los registros
export const getData = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'juegos'), data)
}

//función eliminar 
export const eliminar = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'juegos',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtener = (id) => getDoc(doc(db,'juegos',id))

//función para actualizar los datos del documento 
export const update = (id,juego) =>{
    //updateDoc es una función de firestore permite modificar un documento seleccionado 
    updateDoc(doc(db,'juegos',id),juego)
}