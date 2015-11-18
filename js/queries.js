import Relay from 'react-relay';

let queries = {
  app: () => Relay.QL`
    query {
      app
    }
  `,
};

export default queries;
