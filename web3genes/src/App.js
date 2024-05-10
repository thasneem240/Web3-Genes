import Login from './Login';
import Navbar from './Navbar';
import UsersList from './UsersList';
import UserOnboarding from './UserOnboarding';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (

    <Router>
      <div className="App">
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>
          
          <Route path="/user-onboarding">
            <Navbar />
            <UserOnboarding />
          </Route>

          <Route path="/users-List">
            <Navbar />
            <UsersList />
          </Route>
          
        </Switch>
      </div>

    </Router>

  );
}

export default App;
