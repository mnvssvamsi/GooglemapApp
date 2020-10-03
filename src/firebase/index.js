import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCheBZOjnQsPJsu3hE6a3Sjgdp07_GwsjM",
    authDomain: "map-building-7f022.firebaseapp.com",
    databaseURL: "https://map-building-7f022.firebaseio.com",
    projectId: "map-building-7f022",
    storageBucket: "map-building-7f022.appspot.com",
    messagingSenderId: "563262486796",
    appId: "1:563262486796:web:440df6733ef08adb8bf129",
    measurementId: "G-KYCDV8P0QM"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();
export {storage, database, firebase as default};