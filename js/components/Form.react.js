import React from 'react';


class RegistrationForm extends React.Component {
  static defaultProps = {
    /**
     * field: [
     *   {
     *     type: !'',
     *     name: !'',
     *     required: false,
     *     value: '',
     *   }
     * ]
     */
    fields: []
  }
  render() {
    return (
      <form
        className="ui form"
        onSubmit={this._submitHandler.bind(this)}
        ref={(form) => this.form = form}
      >
        <div className="required field">
          <label>Username:</label>
          <input type="text" />
        </div>
        <div className="required field">
          <label>Password:</label>
          <input type="password" />
        </div>
        <div className="required field">
          <label>Confirm password:</label>
          <input type="password" />
        </div>
        <button type="submit" className="ui button primary">
          Create
        </button>
      </form>
    );
  }

  _submitHandler(e) {
    e.preventDefault();
    this._updateState();
  }
  _initProps() {
    
  }
}

export default RegistrationForm;
