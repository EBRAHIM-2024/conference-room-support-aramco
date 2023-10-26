import React, {useEffect ,createContext, useContext,useReducer } from 'react';
import './App.css';
import Navigation from './components/navigation';
import { BrowserRouter, Route, Routes, useNavigate, } from 'react-router-dom';
import HomeComponent from './components/home';
import OrdersComponent from './components/orders';
import SettingsComponent from './components/settings';
import LoginComponent from './components/login';
import TiketComponent from './components/ticket';
import UsersComponent from './components/users';
import Register from './components/Register';
import {reducer,initialState} from './reducers/userReducers'
import EditEmployee from './components/editEmployee';
import EditBulding from './components/editBulding';
import EditRoom from './components/editRoom';
import InfoComponent from './components/Info';
import EditIsnpector from './components/editInspector';

 export const UserContext=createContext();
const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/home')
    }else{
      navigate('/login')
    }
  },[])
  return(
    <Routes>
          <Route path="/" element={<Navigation/>}>
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/orders" element={<OrdersComponent />} />
          <Route path="/tiket/:roomID" element={<TiketComponent />} />
          <Route path="/users" element={<UsersComponent />} />
          <Route path="/info" element={<InfoComponent />} />
          <Route path="/sinUp" element={<Register />} />
          <Route path="/settings" element={<SettingsComponent />} />
          <Route path="/editEmployee/:employeeID" element={<EditEmployee />} />
          <Route path="/EditIsnpector/:isnpectorID" element={<EditIsnpector />} />
          <Route path="/editBulding/:buildingID" element={<EditBulding />} />
          <Route path="/editRoom/:roomID" element={<EditRoom />} />
          {/* <Route path='/login' element={<LoginComponent/>}/> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
   const renderPage=() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {

      return[<Routing/>]

    }else{
      return[<LoginComponent/>]


    }
   }
  return (
    <UserContext.Provider value={{state,dispatch}}>
  <BrowserRouter>
  {renderPage()}
  </BrowserRouter>
  </UserContext.Provider>

  );
}

export default App;
