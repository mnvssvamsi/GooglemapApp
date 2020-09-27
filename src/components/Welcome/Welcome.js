import React, { useState } from 'react'
import './Welcome.css'
import * as actions from '../../Store/actions/index'
import { connect } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import {Redirect} from 'react-router-dom'
 const Welcome = (props) => {
    const[name,setName] =useState('')
    const[submitted, setSubmited] =useState(false)

    // console.log("welcome", props.token)

    const formSubmitHandler =(e)=> {
        e.preventDefault();
        props.onName(name, props.token);
        setSubmited(true)
    }

    return (
        <div className='welcome' >
            {submitted && <Redirect to='/names/maps' />}
            <Navbar />
            <h2>Welcome to Maps</h2>
            <p>Please enter your name here before checking the maps</p>
            <form className='form' onSubmit= {formSubmitHandler} >
            <input className='name'
             type='text'  value={name}
            placeholder= 'Enter your name' required 
            onChange= {(e)=>{
                setName(e.target.value)
            }}
            />
            <input className='submit' type='submit' />
            </form>
            {/* {name} */}
        </div>
    )
}

const mapStateToProps = state =>{
    return {
       token: state.auth.token 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onName: (name, token)=> dispatch(actions.userName(name, token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Welcome)