import React, { Fragment, useState } from 'react'
import './Auth.css'
import { connect } from 'react-redux'
import * as actions from '../../Store/actions/index';
import Navbar from '../../components/Navbar/Navbar';
import { Redirect } from 'react-router-dom';
import SmallEclipse from '../../images/small-eclipse.svg';
import MedEclipse from '../../images/mid-eclipse.svg'
import BIgEclipse from '../../images/big-eclipse.svg'
import Footer from '../../components/Footer/Footer';
import GoogleLogo from '../../images/mapLogo.png'
const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isSignup, setIsSignup] = useState(true)

    // const[authRedirect,setAuthRedirect]=  useState('')
    // const [errorMessage, setErrorMessage] =useState(null)

    // console.log("auth", props)

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.onAuth(email, password, isSignup)
        var emailRegx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        if (emailRegx.test(email)) {
            setEmailError('')
        } else {
            setEmailError('please enter a valid email')
            return
        }
        var passwordText = password;
        // var passwordRegx = /^{10}$/;
        if (passwordText === '') {
            setPasswordError('please enter a valid password')
            return
        }
        else {
            setPasswordError('')
        }

        // console.log("history", props.history)

    }
    return (
        <Fragment>
            <Navbar />
            {props.isAuthenticated && <Redirect to='/names' />}
            <div className='headerMain'>
            <img src={GoogleLogo} alt='logo' />
                <div className='headerData'>
                <h1>Google Maps App</h1>
                <h4>The Place for all the Places </h4>
                </div>
            </div>
            <div className='ContactData'>
                {/* {errorMessage && (<p>{props.error.message}</p>)} */}
                <form onSubmit={(e) => submitHandler(e)} >
                    <div className="Input">
                        <input className="InputElement"
                            type="email" placeholder=" E-Mail" name='email'
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange={(e) => {
                                setEmailError('')
                                setEmail(e.target.value)
                            }}
                            value={email}
                        //  required
                        />
                        {emailError && <p className='error' style={{ color: 'red' }}>{emailError}</p>}
                    </div>
                    <div className="Input">
                        <input className="InputElement"
                            type="password" placeholder=" Password" name='password'
                            // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange={(e) => {
                                setPasswordError('')
                                setPassword(e.target.value)
                            }}
                            value={password} minLength='6'
                        //  required
                        />
                        {passwordError && <p className='error' style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                    <div>
                        <button className="Button" disabled="">SUBMIT</button>
                    </div>
                </form>
                <button onClick={switchAuthModeHandler}>
                    SWITCH TO {isSignup ? "SIGN IN" : "REGISTER"}
                </button>
            </div>
            <div>
                <img className='big-circle' src={BIgEclipse} alt='big' />
                <img className='medium-circle' src={MedEclipse} alt='med' />
                <img className='small-circle' src={SmallEclipse} alt='small' />
            </div>
            <Footer />
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}


// dispatching here via props
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
