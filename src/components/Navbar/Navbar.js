import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    console.log("nav", this.props);
    return (
      <nav>
        <div className="navbar">
          <div className='Maps' >Maps</div>
          <div className='login'>
            <ul className="navbar-home">
              {!this.props.isAuthenticated ?
                <li className="NavigationItem">
                  <Link to="/">Login</Link>
                </li>
                :
                <li className="NavigationItem">
                  <Link to="/logout">Logout</Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default connect(mapStateToProps)(Navbar);
