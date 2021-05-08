import './App.css'
import UserForm from './components/UserForm'
import IntroMessage from './components/IntroMessage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <UserForm
              actionForm="http://localhost:3000/signIn"
              isRegistered={false}
            />
          </Route>
          <Route exact path="/signIn">
            <UserForm
              actionForm="http://localhost:3000/intro"
            />
          </Route>
          <Route exact path="/intro">
            <IntroMessage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
