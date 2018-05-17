import React, { Component } from "react";
import axios from "axios";

class CoinsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR"
      )
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({ cryptos: cryptos });
      });
  }
}
