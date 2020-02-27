import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.js';
import CourseCont from './components/courses/CourseCont.js';
import Students from './components/students/Students.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/courses" component={CourseCont} />
            <Route path="/students" component={Students} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const Home = () => (
  <div>
    <h1>HOME PAGE</h1>
  </div>
)

export default App;
