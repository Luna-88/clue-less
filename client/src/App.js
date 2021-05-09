import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import UserForm from './components/UserForm'
import IntroMessage from './components/IntroMessage'
import Rooms from './components/Rooms'
import RoomInspection from './components/RoomInspection'

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
          <Route exact path="/rooms">
            <Route exact path="/:roomId">
              <RoomInspection />
            </Route>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
