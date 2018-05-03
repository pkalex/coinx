import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TitleAreaFieldGroup from "../common/TitleAreaFieldGroup";
import { addCoin } from "../../actions/coinActions";

class CoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ticker: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newCoin = {
      name: this.state.name,
      ticker: this.state.ticker,
      user: user.name
    };

    this.props.addCoin(newCoin);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="coin-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TitleAreaFieldGroup
                  placeholder="Coin name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TitleAreaFieldGroup
                  placeholder="Coin ticker"
                  name="ticker"
                  value={this.state.ticker}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CoinForm.propTypes = {
  addCoin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addCoin })(CoinForm);
