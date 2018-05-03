import React, { Component } from "react";
import PropTypes from "prop-types";
import CoinItem from "./CoinItem";

class CoinFeed extends Component {
  render() {
    const { coins } = this.props;

    return coins.map(coin => <CoinItem key={coin._id} coin={coin} />);
  }
}

CoinFeed.propTypes = {
  coins: PropTypes.array.isRequired
};

export default CoinFeed;
