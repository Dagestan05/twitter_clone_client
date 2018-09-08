import React, { Component } from 'react'
import { connect } from 'react-redux';

//hoc to render authenticated routes
export default function withAuth(ComponentToBeRendered){
  class Authenticate extends Component{
    //check if the user is logged in before compnt mounts
    componentDidMount() {
      if (this.props.isAuthenticated ===false) {
        this.props.history.push("/signin")
      }
    }
    //check if the user is logged if compnnt updates
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated ===false) {
        this.props.history.push("/signin")
      }
    }
    render(){
      return <ComponentToBeRendered {...this.props} />
    } 
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated }
  }

  return connect(mapStateToProps)(Authenticate)
}
