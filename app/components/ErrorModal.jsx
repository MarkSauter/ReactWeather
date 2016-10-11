var React = require('react');
var PropTypes = React.PropTypes;

class ErrorModal extends React.Component {
  componentDidMount () {
    var modal = new Foundation.Reveal($('#error-modal'));
    modal.open();
  }

  render () {
    var {title, message} = this.props;
    return (
      <div id="error-modal" className="reveal tiny text-center" data-reveal="">
        <h4>{title}</h4>
        <p>{message}</p>
        <p>
          <button className="button hollow" data-close="">Okay</button>
        </p>
      </div>
    );
  }
}
ErrorModal.propTypes = {
  title: React.PropTypes.string,
  message: React.PropTypes.string.isRequired
};
ErrorModal.defaultProps = {
  title: 'Error'
};

module.exports = ErrorModal;
