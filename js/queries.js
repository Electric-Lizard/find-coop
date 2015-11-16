import Relay from 'react-relay';

let queries = {
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

export default queries;
