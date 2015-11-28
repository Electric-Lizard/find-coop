import Relay from 'react-relay';


class LogoutMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {logout}`;
  }

  getVariables() {
    return {};
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          app: this.props.app.id,
        }
      },
    ];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on LogoutPayload {
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

export default LogoutMutation;
