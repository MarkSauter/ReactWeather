var React = require('react');
var PropTypes = React.PropTypes;
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

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
    this.setState({
      location: undefined,
      temp: undefined,
      isLoading: true,
      errorMessage: undefined
    });
    openWeatherMap.getTemp(location).then(temp => {

      this.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, error => {
      this.setState({
        isLoading: false,
        errorMessage: error.message
      });
    });
  }

  componentDidMount () {
    var location = this.props.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash='#/';
    }
  }

  componentWillReceiveProps (newProps) {
    var location = newProps.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash='#/';
    }
  }

  render () {
    var {isLoading, location, temp, errorMessage} = this.state;

    function renderMessage () {
      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (temp && location) {
        return <WeatherMessage location={location} temp={temp}/>;
      }
    }

    function renderError() {
      if (errorMessage) {
        return (
          <ErrorModal message={errorMessage}/>
        );
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
      </div>
    );
  }
}

module.exports = Weather;
