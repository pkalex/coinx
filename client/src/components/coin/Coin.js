import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CoinItem from "./CoinItem";
import Spinner from "../common/Spinner";
import { getCoin } from "../../actions/coinActions";

class Coin extends Component {
  componentDidMount() {
    this.props.getCoin(this.props.match.params.id);
  }

  render() {
    const { coin, loading } = this.props.coin;
    let coinContent;

    if (coin === null || loading || Object.keys(coin).length === 0) {
      coinContent = <Spinner />;
    } else {
      coinContent = (
        <div>
          <CoinItem coin={coin} showActions={false} />
        </div>
      );
    }

    return (
      <div className="coin">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/coins" className="btn btn-light mb-3">
                All Coins
              </Link>
              {coinContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Coin.propTypes = {
  getCoin: PropTypes.func.isRequired,
  coin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coin: state.coin
});

export default connect(mapStateToProps, { getCoin })(Coin);
