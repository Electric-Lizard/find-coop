import LoginMutation from '../mutations/LoginMutation';

import React from 'react';
import Relay from 'react-relay';


class LoginForm extends React.Component {
  state = {
    errors: []
  };

  componentWillMount() {
    const {app} = this.props;
    if (app.viewerAuthorized) this.props.history.pushState(null, './');
  }

  render() {
    const changeEvent = {onChange: this._handleChange.bind(this)};
    const {errors} = this.state;
    return (
      <form
        className="ui form"
        onSubmit={this._submitHandler.bind(this)}
        ref={(form) => this.form = form}
      >
        {errors.map((err) =>
          <div className="ui visible error message">{err}</div>
        )}
        <div className="required field">
          <label>Username:</label>
          <input name="username" type="text" {...changeEvent}/>
        </div>
        <div className="required field">
          <label>Password:</label>
          <input type="password" name="password" {...changeEvent}/>
        </div>
        <button type="submit" className="ui button primary">
          Sign in
        </button>
      </form>
    );
  }

  _handleAuthorization(payloads) {
    const payload = payloads.login;
    if (payload.status !== 'SUCCESS') {
      this.setState({
        errors: payload.errors,
      });
    } else {
      this.props.history.goBack();//FIXME: not reliable
    }
  }

  _submitHandler(e) {
    e.preventDefault();
    const user = this.state;
    const {app} = this.props;
    const onSuccess = this._handleAuthorization.bind(this);
    Relay.Store.update(new LoginMutation({user, app}), {onSuccess});
  }

  _handleChange(e) {
    const t = e.target;
    this.setState({[t.name]: t.value});
  }
}

export default Relay.createContainer(LoginForm, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        ${LoginMutation.getFragment('app')},
        viewerAuthorized,
      }
    `
  }
});
