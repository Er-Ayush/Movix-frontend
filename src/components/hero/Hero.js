import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {useSelector } from 'react-redux';
import api from "../../api/axiosConfig"

const Hero = ({movies}) => {
    const user =useSelector((state)=>state.user);
    const isLoggedIn =user.isLoggedIn;
    const navigate = useNavigate();

    function reviews(movieId)
    {
        navigate(`/Reviews/${movieId}`);
    }

    const addFav=async (imdbId)=>{
        console.log('hi');
        try {
            const response =api.post('/api/v1/user/addfav',{
                imdbId:imdbId,
                username:user.email,
            })
            console.log(done);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className ='movie-carousel-container'>
      <Carousel>
        {
            movies?.map((movie) =>{
                return(
                    <Paper key={movie.imdbId}>
                        <div className = 'movie-card-container'>
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <div className="movie-buttons-container">
                                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon"
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                        </Link>

                                        <div className="movie-review-button-container">
                                            <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                        </div>
                                        {
                                        isLoggedIn ? 
                                        <div className="movie-fav-button-container">
                                        <Button  variant ="info" onClick={() => addFav(movie.imdbId)} style={{width:"150px" , marginLeft:"10px"}}>Add to Fav</Button>
                                         </div>

                                        : null
                                       }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
        }
      </Carousel>
      
    </div>
  )
}

export default Hero
