import axios from "axios";

export const GET_POSTS = "GET_POSTS";


export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3080/api/post/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data.result });
      })
      .catch((err) => console.log(err));
  };
};