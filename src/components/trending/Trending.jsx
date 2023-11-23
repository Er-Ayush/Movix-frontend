import React, { useEffect, useState } from 'react'
import './Trending.css';
import api from "../../api/axiosConfig";
import TrendingCard from './TrendingCard';
import Loader from "../Loader/Loader";

const Trending = () => {

    const [pageNo , setPageNo] = useState(1);
    const[arr,setArr] = useState([]);
     const[show,setshow] = useState(true);
    
    const pages = [];
    for(let i=1;i<20;i++)
    {
        pages.push(i);
    }

    const handleClick = (i)=>{
        setPageNo(i);
        getTrendingMovies();
    }


    const getTrendingMovies = async()=>{

        try {
            const res = await api.get(`api/v1/movies/trending/${pageNo}`);
            const data = res.data.results;
            setArr(data);
            setshow(false);
        } 
        catch (error) {
            console.log(error);
            setshow(false);
        }

    }

    useEffect(()=>{
        getTrendingMovies();
    },[]);

  return (
    <>
        {
            show?(
                <Loader />
            ):
            (
                <>
                <h2 style={{display:"flex" , alignItems:"center" , color:"white" ,  justifyContent:"center" , marginTop:"50px" , marginBottom:"50px" }}>
        TRENDING MOVIES
    </h2>
    <div className='movie-card-outer'>
    {   
        arr.map((movie, index) => (
            <TrendingCard key={index} data={movie} />
          ))
          
        
    }
    </div>

    <div className='page-outer-cont'>

        {
            pageNo!=1 ? <div onClick={()=>handleClick(pageNo-1)}  style={{color:"hsl(187, 90%, 45%)" , fontSize:"1.2rem" , cursor:"pointer"}} > ＜ </div> : null
        }
        {   
        
            pages.map((i,index)=>{
                
                    return pageNo !== i ?
                    <div className='page-cont' key={i} onClick={()=>handleClick(i)}>{i}</div>
                    : <div className='page-used-cont' key={i}>{i}</div>
                
            })


        }
        {
            pageNo!=19 ? <div onClick={()=>handleClick(pageNo+1)} style={{color:"hsl(187, 90%, 45%)" , fontSize:"1.2rem" , cursor:"pointer"}} > ＞ </div> : null
        }

    </div>
    </>
            )
        }
    </>
  )
}

export default Trending