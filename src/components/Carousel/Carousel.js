import axios from 'axios';
import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPoster } from '../../config/config';
import "./Carousel.css"


const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY

  const items = credits?.map(c => (
    <div className="carouselItem">
      <img 
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPoster} 
        alt={c?.name} 
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ))

  const responsive = {
    0: {
      items: 3
    },
    512: {
      items: 5
    },
    1024: {
      items: 7
    }
  }

  const fetchCredits = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`)
    setCredits(data.cast)
  }

  useEffect(() => {
    fetchCredits()
  }, [])

  return (
    <AliceCarousel 
      mouseTracking 
      items={items} 
      responsive={responsive}
      infinite
      disableButtonsControls
      disableDotsControls
    />
  );
}

export default Carousel