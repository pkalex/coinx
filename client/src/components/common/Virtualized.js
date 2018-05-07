import React from "react";
import createClass from "create-react-class";
import VirtualizedSelect from "react-virtualized-select";

const DATA = require("./data");

var CitiesField = createClass({
  displayName: "CitiesField",
  getInitialState() {
    return {};
  },
  updateValue(newValue) {
    this.setState({
      selectValue: newValue
    });
  },
  render() {
    var options = DATA.CITIES;
    return (
      <div className="section">
        <h3 className="section-heading">Cities</h3>
        <VirtualizedSelect
          ref="citySelect"
          options={options}
          simpleValue
          clearable
          name="select-city"
          value={this.state.ticker}
          onChange={this.state.name}
          searchable
          labelKey="name"
          valueKey="name"
        />
      </div>
    );
  }
});
export default CitiesField;
