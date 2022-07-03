import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";


export const loginUser = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:3080/api/auth/login", data )
      .then((res) => {
        dispatch({ type: LOGIN_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};