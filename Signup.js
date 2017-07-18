import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Accounts } from 'meteor/accounts-base';

class Signup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      error: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 6) {
      return this.setState({error: 'Password must be more than 8 characters long'})
    }

    Accounts.createUser({email, password}, (err) => {
      // check if errors
      if(err) {
        // print out error
        this.setState({ error: err.reason})
      } else {
        // set error state to empty
        this.setState({ error: ''})
      }
    })

  //  this.setState({
  //    error: 'Something went wrong'
  //  })

  }

  render(){
    return (
      <div>
        <h1>Join Short Link</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined }

        <form onSubmit={e => this.onSubmit(e)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        <Link to="/">Already Have an Account?</Link>
      </div>
    )
  }
}

export default Signup;
