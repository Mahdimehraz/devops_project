import { redirect } from "react-router-dom";
import axios from "axios";

const url =  process.env.REACT_APP_API_URL || "https://todos-backend-4a50.onrender.com";

export async function checkAuthLoader() {
  let flag = false;
  await axios
    .post(
      `${url}/auth/verifyToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )
    .then(async (response) => {
      if (response.status === 200) {
        flag = true;
      }
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
    });
  if (flag) {
    return flag;
  } else {
    return redirect("/login");
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token || token === undefined || token === null) {
    return null;
  }

  return token;
}
