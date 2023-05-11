import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export function createUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(userCredential);
      console.log(user);
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error(error)
    });
}