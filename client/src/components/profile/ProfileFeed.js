import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileFeedItem from "./ProfileFeedItem";

class ProfileFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => <ProfileFeedItem key={post._id} post={post} />);
  }
}

ProfileFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default ProfileFeed;
