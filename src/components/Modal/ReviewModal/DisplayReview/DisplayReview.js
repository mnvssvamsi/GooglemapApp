import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import './DisplayReview.css'
import ReviewModal from '../ReviewModal'
// import ImageModal from './ImageModal/ImageModal'

const DisplayReview = (props) => {
  
  const [reviews, setReviews] = useState([])
  const [image, setImage] = useState([])
  const [writeReview, setWriteReview] = useState(false)
  // const [imageSelection, setImageSelection] = useState(false)


  const reviewHandler = () => {
    setWriteReview(true)
  }
  const reviewCloseHandler = () => {
    setWriteReview(false)
  }

  //to display image in zoom position
  // const imageHandler = () => {
  //   setImageSelection(true)
  // }
  // const imageCloseHandler = () => {
  //   setImageSelection(false)
  // }


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

  useEffect(() => {
    axios.get('https://map-building-7f022.firebaseio.com/images.json')
      .then(response => {
        console.log('images', response)
        let imageRes = response.data;
        let imageLoadedData = [];
        for (let imageKey in imageRes) {
          imageLoadedData.push({
            id: imageKey,
            image: imageRes[imageKey].images
          })
        }
        setImage(imageLoadedData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  let reviewData = reviews.map(reviewElement => {
    return <p className='review' key={reviewElement.id}>{reviewElement.review}</p>
  })
  let imageData = image.map(imageElement => {
    return <p  className='review-photo' key={imageElement.id}> <img src={imageElement.image} alt='reviewPhoto' /></p>
  })

  return (
    <Fragment>
      <div className="display-review-modal">
        {/* {imageSelection && <ImageModal
          fullImage={imageData}
          close={imageCloseHandler}
        />} */}
        {writeReview && <ReviewModal close={reviewCloseHandler} />}
        <button onClick={reviewHandler} className='write-review'>Write a review</button>
        {reviewData}
        {imageData}
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