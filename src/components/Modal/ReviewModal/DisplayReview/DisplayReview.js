import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import ReviewModal from '../ReviewModal'
import './DisplayReview.css'

const DisplayReview = (props) => {

  const [reviews, setReviews] = useState([])
  const[writeReview, setWriteReview] = useState(false)

  const reviewHandler= ()=> {
    
    setWriteReview(true)
  }
 const  reviewCloseHandler=()=> {
    setWriteReview(false)
  }

  useEffect(() => {
    axios.get('https://map-building-7f022.firebaseio.com/reviews.json')
      .then(response => {
        let res = response.data;
        let loadedData = [];
        for (let key in res) {
          loadedData.push({
            id: key,
            review: res[key].reviews
          })
        }
        setReviews(loadedData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  let reviewData = reviews.map(reviewElement => {
    return <p className='review' key={reviewElement.id}>{reviewElement.review}</p>
  })
  return (
    <Fragment>
      <div className="display-review-modal">
      {writeReview && <ReviewModal close= {reviewCloseHandler} />}
        <button onClick={reviewHandler} className='write-review'>Write a review</button>
        {reviewData}
        <div className="display-review-modal__actions">
          <button type="button" onClick={props.close}>
            X
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default DisplayReview