// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };


// const app = initializeApp(firebaseConfig);

// export const db = getDatabase(app);

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAr7jj7W9rTVJ2lFqD062BUF7OuWs8UzW0",
  authDomain: "walk-that-duck.firebaseapp.com",
  databaseURL: "https://walk-that-duck-default-rtdb.firebaseio.com",
  projectId: "walk-that-duck",
  storageBucket: "walk-that-duck.appspot.com",
  messagingSenderId: "557769312726",
  appId: "1:557769312726:web:fa554e48c916cb2c89bc77",
  measurementId: "G-5BB07SF0KW"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
