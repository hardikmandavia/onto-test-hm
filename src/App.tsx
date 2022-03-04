import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Layout from './components/Layout';

import AppMessagesProvider from './contexts/AppContext';

export const App = () => {
  return (
    <AppMessagesProvider>
      <Layout>
        <Router>
          <Switch>
            <Route path="/test">
              <div>This is a test page</div>
            </Route>
            <Route path="/" exact>
              <Home message="Hello World!" />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </AppMessagesProvider>
  );
};
