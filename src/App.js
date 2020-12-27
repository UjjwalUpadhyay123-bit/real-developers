
import './css/app.scss';
import Home from './view/Home';
import { Route, Switch } from 'react-router-dom';
import CreateProject from './view/CreateProject';

function Page404() {
  return <div className="container text-center mt-5"><h2>Page Not Found</h2></div>
}

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/create' component={CreateProject} />
        <Route path='/edit/:id' component={CreateProject} />
        <Route component={Page404} />
      </Switch>
    </main>
  );
}

export default App;
