var React = require('react');
var PropTypes = React.PropTypes;

var WeatherForm = React.createClass({

  onFormSubmit: function (e) {
    e.preventDefault();

    var location = this.refs.location.value.trim();

    if (location) {
      this.refs.location.value = '';
      this.props.onSearch(location);
    }
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" ref="location" placeholder="Enter city name"/>
          <button className="button expanded hollow">Get Weather</button>
        </form>
      </div>
    );
  }

});

module.exports = WeatherForm;
