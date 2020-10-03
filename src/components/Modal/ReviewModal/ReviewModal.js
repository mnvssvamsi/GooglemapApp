import React, { useState } from "react";
import "./ReviewModal.css";
import axios from 'axios'
import {storage} from '../../../firebase'


const Modal = React.memo((props) => {

  const [review, setReview] = useState('')
  // const[submitted, setSubmitted] = useState(false)
  const [image,setImage]= useState(null);
  const[progress,setProgress] = useState(0)
  const [url,setUrl] =useState(null)


  //submit handler
  const reviewSubmitHander = (e) => {
    e.preventDefault();
    const reviewData = {
      reviews: review
    }
    let api = 'https://map-building-7f022.firebaseio.com/reviews.json'
    axios.post(api, reviewData)
      .then(response => {
        // console.log("post review",response)
      }).catch(error => {
        console.log(error)
      })
      // setSubmitted(true)
      const imageData={
        images: url
       }
      axios.post('https://map-building-7f022.firebaseio.com/images.json',imageData)
      .then (res=> {
        console.log(res)
      })
  }
  //image handler
  const handleChange= e => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  // image upload handler
  const handleUpload = () => {
    const uploadTask =
    `${image.name}` !== null ?
     storage.ref(`images/${image.name}`).put(image) 
     : null;
    console.log('image', image, image.name)
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        // storage
        //   .ref("images")
        //   .child(image.name)
        //   .getDownloadURL()
        //   .then(url => {
        //     setUrl(url);
        //   });
        uploadTask
        .snapshot
        .ref
        .getDownloadURL()
        .then(url => {
          setUrl(url);
        });

      }
    );
  };

  return (
    <React.Fragment>
      {/* {submitted && props.close()} */}
      <div className="backdrop" onClick={props.close} />
      <div className="review-modal">
        <form onSubmit={reviewSubmitHander}>
          <label className='text-label'>Enter your review</label>
          <textarea className='text' value={review} required
            onChange={(e) => { setReview(e.target.value) }}
          />
          <progress className='progress' value={progress} max= '100' />
          <input className='input-file' type='file' onChange= {handleChange} />
          <button className='upload-file' onClick={(image)=>handleUpload(image)} >Upload</button>
          <input className='review-submit' type='submit' />
          <img className='upload-image' src={url || "http://via.placeholder.com/300"} alt='upload' />
        </form>
        <div className="review-modal__actions">
          <button type="button" onClick={props.close}>
            X
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Modal;
