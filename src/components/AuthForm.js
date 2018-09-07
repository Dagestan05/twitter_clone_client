import React, { Component } from 'react'

class AuthForm extends Component {
  state={
    email: "",
    username: "",
    password: "",
    profileImageurl: ""
  }

  handleInputChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e=>{
    e.preventDefault();
    console.log(this.props);
    
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(()=>{
      console.log("logged in successfully");
      
    })
  }

  render() {
    const { email, password, username, profileImageurl } = this.state;
    const { heading, btnText, signUp, errors, removeError, history } = this.props;
    //history obj from rRouter
    history.listen(_=>{ //listen to any change in history
      removeError(); //if there is a change, remove error
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{ heading }</h2>

              { errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}

              <label htmlFor="email">Email:</label>
              <input 
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={ this.handleInputChange }
                  />

              <label htmlFor="password">Password:</label>
              <input 
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={ this.handleInputChange }
                  />
              {signUp && <div>
                <label htmlFor="username">Username:</label>
                <input 
                  type="username"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={ this.handleInputChange }
                />

                <label htmlFor="profileImageUrl">Profile Image:</label>
                <input 
                  type="profileImageUrl"
                  className="form-control"
                  id="profileImageUrl"
                  name="profileImageUrl"
                  onChange={ this.handleInputChange }
                />
              </div>}

              <button type="submit" className ="btn btn-primary btn-block btn-lg">
                {btnText}
              </button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AuthForm;