import React from 'react'
import "./Header.css"
import Clapper from "../../images/clapper.png"
import Video from "../../images/video-camera.png"

const Header = () => {
  return (
    <div>
      <span className="header" onClick={() => window.scroll(0, 0)}>
        <img className="logo-img" src={Clapper} alt="" />
        <span>lobflix</span>
        <img className="logo-img" src={Video} alt="" />
      </span>
    </div>
  )
}

export default Header
