import './App.css'
import UserForm from './components/UserForm'
import SignInForm from './components/SignInForm'
import { Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={UserForm} />
        <Route exact path="/signin" component={SignInForm} />
      </Switch>
    </div>
  )
}
