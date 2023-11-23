import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useSelector } from "react-redux";
import { useState } from "react";
import './userProfile.css';
import MovieCard from "../MovieCard/MovieCard";

const UserProfile = () => {
  const user = useSelector((state) => state.user);

//   const [temp, setTemp] = useState({ name: "", email: "", password: "" });
  const [arr, setArr] = useState([]);

  const getFavMovies = async () => {
    try {
    //   temp.name = user.name;
      const res = await api.post("api/v1/user/getFavList", {
        username: user.email,
      });

      const movie_ids = res.data;
      //   console.log(movie_ids);
      setArr(movie_ids);
      //   console.log("herer is ", arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavMovies();
  }, []);

//   console.log(arr);

  return (
    <>
      {/* <div></div> */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "4rem" }}>YOUR FAVOURITES</h2>
        </div>

        <div>
          {arr.length > 0 ? (
            <div className="movie-grid-container" >
              {arr?.map((det, i) => {
                return <MovieCard   data={det} key={i} />;
              })}
            </div>
          ) : (
            <div>ADD TO FAVOURITES TO GET STARTED ON YOUR JOURNEY</div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserProfile;
