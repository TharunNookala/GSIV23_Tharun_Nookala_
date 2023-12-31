import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatRuntime } from '../utils/utils';

const Details = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const creditsURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`;
    const requestURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`;
    useEffect(() => {
        axios.get(requestURL).then((response) => {
            setMovie(response.data)
        });
        axios.get(creditsURL).then((response) => {
            let detailCast = (response.data.cast).slice(0,3).map((item)=> item.name).join(', ');
            let detailCrew = (response.data.crew).filter((item)=> item.known_for_department === "Directing");
            const director = detailCrew[0].name;
            setCast(detailCast)
            setCrew(director)
        })
    }, [requestURL,creditsURL]);
    
    return (
        <section className='flex flex-col sm:flex-row w-screen h-screen gap-2 items-start p-4'>
            <div className='sm:w-[30%] md:w-1/2 h-1/2 lg:h-3/5 p-2 border'>
                <img src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt='title' className='w-full h-full' />
            </div>
            <div className='p-4 border sm:w-[40%] mt-3 flex-1'>
                <h2 className='text-lg font-semibold mb-2'>{movie?.title} {movie?.vote_average}</h2>
                <p>{(movie?.release_date)?.split('-')[0]} | {formatRuntime(movie.runtime)} | {crew}</p>
                <p>Cast : {cast} etc...</p>
                <p>{movie?.overview}</p>
            </div>
        </section>
    )
}

export default Details