import { createUser } from "../utils/auth.js"

export default function LogIn() {

  function click() {
    createUser("austin@email.com", "mypassword")
  }

  return (
    <button onClick={click} style={{ height: "40px" }} > Log In</ button>
  )
}