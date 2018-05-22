import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');

class ProfileFeedItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3 card-custom">
        <div className="row">
          <div className="col-md-1">
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
              </span>
            ) : null}
          </div>
          <div className="col-md-11">
            <h4>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h4>
            {showActions ? (
              <span>
                <a>
                  {" "}
                  <b>
                    <Link to={`/coin/${post.coin}`} className="post-ticker">
                      {post.coin}
                    </Link>
                  </b>{" "}
                  &nbsp;&nbsp; posted by{" "}
                  <b>
                    <Link to={`/profile/${post.name}`}>{post.name}</Link>
                  </b>{" "}
                </a>
                <TimeAgo datetime={post.date} locale="en" />
                &nbsp;&nbsp;
                <Link to={`/post/${post._id}`}>
                  {post.comments.length} Comments
                </Link>&nbsp;&nbsp;
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ProfileFeedItem.defaultProps = {
  showActions: true
};

ProfileFeedItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  ProfileFeedItem
);
