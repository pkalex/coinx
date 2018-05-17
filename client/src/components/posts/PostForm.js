import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
//import "react-select/dist/react-select.css";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TitleAreaFieldGroup from "../common/TitleAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import { getCoins } from "../../actions/coinActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getCoins();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      title: this.state.title,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      coin: this.state.selectedOption.ticker
    };

    this.props.addPost(newPost);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange(selectedOption) {
    this.setState({
      selectedOption
    });
  }
  onFormSubmit(formData) {
    // Dispatch an action
    console.log(formData);
  }
  render() {
    const { errors } = this.state;

    let coins = [...this.props.coins];
    coins = coins.map(coin => {
      coin.value = coin._id;
      coin.label = coin.name;
      return coin;
    });

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TitleAreaFieldGroup
                  placeholder="Post title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <Select
                  name="form-field-name"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={coins}
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  coins: state.coin.coins
});

export default connect(mapStateToProps, { addPost, getCoins })(PostForm);
