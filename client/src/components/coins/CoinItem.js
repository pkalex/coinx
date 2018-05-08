import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCoin } from "../../actions/coinActions";

class CoinItem extends Component {
  onDeleteClick(id) {
    this.props.deleteCoin(id);
  }

  render() {
    const { coin } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{coin.name}</p>
            <Link to={`/coin/${coin._id}`}>
              <p className="lead">{coin.name}</p>
            </Link>
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
  coin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteCoin })(CoinItem);
