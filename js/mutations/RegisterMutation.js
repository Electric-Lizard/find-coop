import Relay from 'react-relay';


class RegisterMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {register}`;
  }

  getVariables() {
    return {
      ...this.props.user,
    };
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'app',
        parentID: this.props.app.id,
        connectionName: 'users',
        edgeName: 'userEdge',
        rangeBehaviors: {
          '': 'append',
        }
      },
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
            fragment on RegisterPayload {
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
      fragment on RegisterPayload {
        app {
          users,
          viewer,
          viewerAuthorized,
        },
        userEdge,
      }
    `;
  }

  static fragments = {
    app: () => Relay.QL`
      fragment on App {
        id
      }
    `,
  }
}

export default RegisterMutation;
