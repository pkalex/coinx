import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

class ProfileSidebar extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <nav className="col-sm-4 col-md-3 hidden-xs-down sidebar">
        <img
          className="rounded-circle"
          src={user.avatar}
          alt={user.name}
          style={{
            width: "125px",
            margin: "auto",
            marginBottom: "15px",
            display: "block"
          }}
          title="You must have a Gravatar connected to your email to display an image"
        />
        <a className="username">{user.name}</a>

        <li class="sidebar-profile d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0">Posts</h6>
            <small class="text-muted">418</small>
          </div>
          <div>
            <h6 class="my-0">Following</h6>
            <small class="text-muted">135</small>
          </div>
          <div>
            <h6 class="my-0">Followers</h6>
            <small class="text-muted">78</small>
          </div>
        </li>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active">
              Current<span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Analytics
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Export
            </a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Nav item
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Nav item again
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              One more nav
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Another nav item
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

ProfileSidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileSidebar);
