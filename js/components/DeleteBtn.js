import React from 'react';
//import Relay from 'react-relay';

class DeleteBtn extends React.Component {
  static defaultProps = {
    onActivate: () => {}
  }
  render() {
    var {onActivate} = this.props;
    return (
      <button onClick={onActivate} className="ui button">delete</button>
    );
  }
}

export default DeleteBtn;
