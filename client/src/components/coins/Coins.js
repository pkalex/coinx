import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CoinForm from "./CoinForm";
import CoinFeed from "./CoinFeed";
import Spinner from "../common/Spinner";
import { getCoins } from "../../actions/coinActions";

class Coins extends Component {
  componentDidMount() {
    this.props.getCoins();
  }

  render() {
    const { coins, loading } = this.props.coin;
    let coinContent;

    if (coins === null || loading) {
      coinContent = <Spinner />;
    } else {
      coinContent = <CoinFeed coins={coins} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CoinForm />
              {coinContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Coins.propTypes = {
  getCoins: PropTypes.func.isRequired,
  coin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coin: state.coin
});

export default connect(mapStateToProps, { getCoins })(Coins);
