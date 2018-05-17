import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getCoinByTicker } from "../../actions/coinActions";

class Coin extends Component {
  componentDidMount() {
    if (this.props.match.params.ticker) {
      this.props.getCoinByTicker(this.props.match.params.ticker);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coin.coin === null && this.props.coin.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { coin, loading } = this.props.coin;
    let coinContent;

    if (coin === null || loading) {
      coinContent = <Spinner />;
    } else {
      coinContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/coins" className="btn btn-light mb-3 float-left">
                Back To Coins
              </Link>
              {coin.ticker}
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      );
    }

    return (
      <div className="coin">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{coinContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Coin.propTypes = {
  getCoinByTicker: PropTypes.func.isRequired,
  coin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coin: state.coin
});

export default connect(mapStateToProps, { getCoinByTicker })(Coin);
