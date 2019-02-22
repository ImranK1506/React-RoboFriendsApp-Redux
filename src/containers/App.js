import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary'
// import { robots } from "./robots";
import './App.css'

class App extends Component {
   constructor() {
      super()
      this.state = {
         robots: [],
         searchfield: ''
      };
      console.log('The Constructor is triggered at first');
   }

   onSearchChange = (event) => {
      this.setState({searchfield: event.target.value});
   };

   componentDidMount() {
      // Grabbing data from local json
      // this.setState({ robots: robots })

      // Grabbing data from API
      fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(users => this.setState({robots: users}));
      // Test Loading if response had delay
      // .then(users => {});
      console.log('The componentDidMount is triggered as last');
   }

   render() {
      const { robots, searchfield } = this.state;
      // filter per robot
      const filteredRobots = robots.filter(robot => {
         return robot.name
             .toLowerCase()
             .includes(searchfield.toLowerCase()
             );
      });
      console.log('The Rendering happens next');
      // In case of latency on fetching API
      return !robots.length ?
          <h1>Loading...</h1> :
          (
              <div className='tc'>
                 <h1 className='f1'>RoboFriends</h1>
                 <SearchBox searchChange={this.onSearchChange}/>
                 <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                 </Scroll>
              </div>
          );

   }
}

export default App;
