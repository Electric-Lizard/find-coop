import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
    app: () => Relay.QL`
      query {
        app
      }
      `,
  };
  static routeName = 'AppHomeRoute';
}
