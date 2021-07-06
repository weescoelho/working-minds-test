import { StateForm } from 'pages/StateForm';
import { StatePage } from 'pages/StatePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from '../pages/Home';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cadastrar/estado" exact component={StateForm} />
      <Route path="/estado/:id" exact component={StatePage} />
    </Switch>
  </Router>
);

export default Routes;
