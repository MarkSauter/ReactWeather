var React = require('react');
var PropTypes = React.PropTypes;
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

class Weather extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: false
    }

    // This explicit binding is needed without babel stage-0 plugin
    //  this.handleSearch = this.handleSearch.bind(this);
    // OR one can use react-autobind
    //  Example:
    //      import autoBind from 'react-autobind';
    //      constructor() {
    //        super();
    //        autobind(this); // automatic binding with smart avoidance of React related methods
    //          OR
    //        autobind(this, 'myMehod1, 'myMethod2'); // explicit binding
    //      }

  }

  // This function declaration is considered experimental ES7.
  // It only works with babel stage-0 plugin
  handleSearch = (location) => {
    this.setState({ isLoading: true });
    openWeatherMap.getTemp(location).then(temp => {

      this.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, errorMessage => {
      this.setState({ isLoading: false });
      alert(errorMessage);
    });
  }

  render () {
    var {isLoading, location, temp} = this.state;

    function renderMessage () {
      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (temp && location) {
        return <WeatherMessage location={location} temp={temp}/>;
      }
    }

    return (
      <div>
        <h1 className="text-center">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
      </div>
    );
  }
}

module.exports = Weather;
