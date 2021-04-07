import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Button } from '@material-ui/core';
import "./ContentModal.css"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#bb4430",
    // outlineColor: "#f3dfa2",
    border: '1px solid #f3dfa2',
    borderRadius: 10,
    outline: "none",
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, id, media_type }) {
  const [content, setContent] = useState()
  const [video, setVideo] = useState()

  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const api_key = process.env.REACT_APP_API_KEY

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDetails = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US`)
    setContent(data)
  }

  const fetchVideo = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${api_key}&language=en-US`)
    setVideo(data.results[0]?.key)
  }

  useEffect(() => {
    fetchDetails()
    fetchVideo()
  }, [])


  return (
    <div>
      <button type="button" className="media" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {
            content && 
            <div className={classes.paper}>
              <div className="ContentModal">
                <img className="ContentModal__portrait" src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.title || content.name}/>
                <img className="ContentModal__landscape" src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.title || content.name}/>
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">{content.overview}</span>
                  <div></div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="primary"
                    target="__blank"
                    href={`http://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          }
        </Fade>
      </Modal>
    </div>
  );
}