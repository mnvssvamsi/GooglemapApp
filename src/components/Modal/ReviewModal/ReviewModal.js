import React, { useState } from "react";
import "./ReviewModal.css";
import axios from 'axios'


const Modal = React.memo((props) => {
  console.log("reviewModal", props);
  const [review, setReview] = useState('')
  const[submitted, setSubmitted] = useState(false)

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
      setSubmitted(true)
  }

  return (
    <React.Fragment>
      {submitted && props.close()}
      <div className="backdrop" onClick={props.close} />
      <div className="review-modal">
        <form onSubmit={reviewSubmitHander}>
          <label className='text-label'>Enter your review</label>
          <textarea className='text' value={review}
            onChange={(e) => { setReview(e.target.value) }}
          />
          <input className='review-submit' type='submit' />
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
