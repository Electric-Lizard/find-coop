import Relay from 'react-relay';


class LoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {login}`;
  }

  getVariables() {
    return {
      ...this.props.user,
    };
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          app: this.props.app.id,
        }
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on LoginPayload {
              status,
              errors,
            }
          `
        ]
      }
    ];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LoginPayload {
        app {
          viewer,
          viewerAuthorized,
        },
      }
    `;
  }

  static fragments = {
    app: () => Relay.QL`
      fragment on App {
        id,
      }
    `,
  }
}

export default LoginMutation;
