import React from 'react'
import {img_300, unavailable} from "../../config/config"
import './SingleContent.css'


const SingleContent = ({ id, title, date, poster, media_type, vote_average }) => {

  // For dates
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="media">
      <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} className="poster"/>
      <b className="title">{title}</b>
      <div className="subTitle">
        <span>{media_type === 'tv' ? "TV-Series" : "Movie"}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default SingleContent
