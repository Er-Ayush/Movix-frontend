import React from 'react'
import "./MovieCard.css"
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import api from '../../api/axiosConfig';

const MovieCard = (props) => {
    const [movie, setMovie] = useState([]);
    // console.log(data);
    const navigate = useNavigate();

    const getSingleMovie=async (movieId)=>{
        // console.log(movieId);
        try {
            const response = await api.get(`/api/v1/movies/${movieId}`);
            // console.log(response.data);
            const singleMovie = response.data;
            setMovie(singleMovie);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getSingleMovie(props.data);
    },[])

    function reviews(params){
        navigate(`/Reviews/${params}`);
    }

    // console.log("this is the data" , data);
    const det = movie;
    // console.log(movie);
    console.log(det.imdbId);
  
  return (
    <>
    <div className='movie-card-outer-cont'>
    
    <div className='movie-card-cont' onClick={() => reviews(det.imdbId)} style={{cursor:'pointer'}}>
    <img src={det.poster} alt={det.title}/>
    </div>  
    <div style={{textAlign:'center'}}>{det.title}</div>

    </div>
    </>
  )
}

export default MovieCard