import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import NavBar from "./components/navbar"

import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Profile from './components/screens/profile'
import Signup from './components/screens/signup'
import Searchbar from './components/screens/searchbar'
import Signin from './components/screens/signin'
import UserProfile from './components/screens/userprofile'
import CreatePost from './components/screens/createpost'
import {initialstate,reducer} from './reducers/userreducer'
export const usercontext=createContext()

const Routing=()=>{
  const history=useHistory() 
  const {state,dispatch}=useContext(usercontext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
     
    }
    else{
      history.push('/signin')
    }
  },[])
  return (
<Switch>
<Route exact path='/'>
      <Home />
    </Route>
    <Route path='/signup'>
      <Signup />
    </Route>
    <Route path='/signin'>
      <Signin />
    </Route>
    <Route exact path='/profile'>
      <Profile />
    </Route>
    <Route path='/profile/:userid'>
      <UserProfile />
    </Route>
    <Route path='/create'>
      <CreatePost />
    </Route>
    
    <Route path='/search'>
      <Searchbar />
    </Route>
    </Switch>
  )
}

function App() {

  const [state,dispatch]=useReducer(reducer,initialstate)

  return (
    <usercontext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing />
    </BrowserRouter>
    </usercontext.Provider>

  );
}

export default App;
