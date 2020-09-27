import React, { useState } from "react";
import "./Modal.css";
import {getGeocode} from 'use-places-autocomplete'
import DisplayReview from "./ReviewModal/DisplayReview/DisplayReview";
const Modal = React.memo((props) => {

  const [reviewSelected, setReviewSelected] =useState(false)

  console.log("modal", props);

  //  getGeocode(props.lat, props.lng)
  //  .then(res => console.log(res))

  const reviewHandler= ()=> {
    setReviewSelected(true)
  }
 const  reviewCloseHandler=()=> {
    setReviewSelected(false)
  }
  return (
    <React.Fragment>
      {reviewSelected ? <DisplayReview close= {reviewCloseHandler}/> : null}
      {/* <div className="backdrop" onClick={props.close} /> */}
      <div className="error-modal">
        <button className='reviewButton' onClick={reviewHandler} >Reviews</button>
        <div className="error-modal__actions">
          <button type="button" onClick={props.close}>
            X
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Modal;
