import React from 'react';
import './App.css';
import Header from './componets/header';
import SideBar from './componets/sideBar';
import UserForm from './componets/userForm';
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <SideBar/>
        <UserForm/>
      </header>
    </div>
  );
}

export default App;
