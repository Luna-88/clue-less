import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import UserForm from './components/UserForm'
import IntroMessage from './components/IntroMessage'
import Rooms from './components/Rooms'
import AccusationForm from './components/AccusationForm'
import WinnerMessage from './components/WinnerMessage'
import LogoutMessage from './components/LogoutMessage'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <UserForm
              actionForm="/signIn"
              isRegistered={false}
            />
          </Route>
          <Route exact path="/signIn">
            <UserForm
              actionForm="/intro"
            />
          </Route>
          <Route exact path="/intro">
            <IntroMessage />
          </Route>
          <Route exact path="/rooms">
            <Rooms />
          </Route>
          <Route exact path="/accuse">
              <AccusationForm />
          </Route>
          <Route exact path="/score">
              <WinnerMessage />
          </Route>
          <Route exact path="/save-logout">
              <LogoutMessage />
          </Route>
          <Route exact path="/quit-logout">
              <LogoutMessage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
