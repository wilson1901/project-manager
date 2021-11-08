import './App.css';
import UserForm from './components/UserForm';
import { UsuarioProvider } from './context/UsuarioContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NewProject from './Views/NewProject';
import Dashboard from './Views/Dashboard';

function App() {
  return (
    <div className="App">
      <UsuarioProvider>
        <Router>
          <Switch>

            <Route exact path="/">
              <Dashboard></Dashboard>
            </Route>

            <Route exact path="/projects/new">
              <NewProject></NewProject>
            </Route>

            <Route exact path="/sign_in">
              <UserForm></UserForm>
            </Route>



          </Switch>

        </Router>
      </UsuarioProvider>

    </div>
  );
}

export default App;
