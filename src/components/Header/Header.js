import React from 'react'
import "./Header.css"
import Clapper from "../../images/clapper.png"
import Video from "../../images/video-camera.png"

const Header = () => {
  return (
    <div>
      <span className="header">
        <img className="logo-img" src={Clapper} alt="Clapper Image" />
        <span>Entertainment Hub</span>
        <img className="logo-img" src={Video} alt="Video Camera Image"/>
        </span>
    </div>
  )
}

export default Header
