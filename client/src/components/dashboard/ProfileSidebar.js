import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

class ProfileSidebar extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <nav className="col-sm-4 col-md-3 hidden-xs-down sidebar">
        <li className="d-flex justify-content-between lh-condensed">
          <div className="sidebar-profile">
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
          </div>
          <div>
            <a className="username">{user.name}</a>
            <h6 className="my-0">Following 135</h6>
            <h6 className="my-0">Followers 87</h6>
            <h6 className="my-0">Posts 407</h6>
          </div>
        </li>

        <table className="table table-striped">
          <tbody>
            <tr>
              <th scope="row">BTC</th>
              <td>9875</td>
              <td>2.3%</td>
              <td>159B</td>
            </tr>
            <tr>
              <th scope="row">ETH</th>
              <td>813</td>
              <td>4.1%</td>
              <td>74B</td>
            </tr>
            <tr>
              <th scope="row">XRP</th>
              <td>0.75</td>
              <td>7.4%</td>
              <td>32B</td>
            </tr>
          </tbody>
        </table>
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
