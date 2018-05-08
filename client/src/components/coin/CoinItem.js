import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deleteCoin, addLike, removeLike } from "../../actions/coinActions";

class CoinItem extends Component {
  onDeleteClick(id) {
    this.props.deleteCoin(id);
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
    const { coin, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col">
            <div>
              <div className="col-md-1">
                {showActions ? (
                  <span>
                    <button
                      onClick={this.onLikeClick.bind(this, coin._id)}
                      type="button"
                      className="btn btn-light mr-1"
                    >
                      <i
                        className={classnames("fas fa-thumbs-up", {
                          "text-info": this.findUserLike(coin.likes)
                        })}
                      />
                      <span className="badge badge-light">
                        {coin.likes.length}
                      </span>
                    </button>
                    <button
                      onClick={this.onUnlikeClick.bind(this, coin._id)}
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
                  <Link to={`/coin/${coin._id}`}>{coin.name}</Link>
                </h4>
              </div>
            </div>
            <div>{coin.text}</div>
            {coin.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, coin._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CoinItem.defaultProps = {
  showActions: true
};

CoinItem.propTypes = {
  deleteCoin: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  coin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteCoin, addLike, removeLike })(
  CoinItem
);
