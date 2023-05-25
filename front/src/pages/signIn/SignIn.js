import React from 'react'
import "./SignIn.css"
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'


const SignIn = () => {
    const {search}= useLocation()
    const redirectUrl= new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ?redirectUrl : "/"
  return (
    <div>
      <Helmet>Sign In</Helmet>
      <form>
        <div>
        <label>Email</label>
        <input type='email'/>
        </div>
        <div>
        <label>Passowrd</label>
        <input type='password'/>
        </div>
        <div>
        <button type='submit'>Sign In</button>
        </div>
        <div>
            <p>New Customer?</p>
            <Link to={`/signup?redirect=${redirect}`}><span>Create New Account</span></Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn
