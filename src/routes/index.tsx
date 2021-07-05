import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from '../pages/Home';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);

export default Routes;
