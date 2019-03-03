import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header';
// import { robots } from "./robots";
import './App.css'

import { setSearchField, requestRobots } from "../action";

const mapStateToProps = state => {
   return {
      searchField: state.searchRobots.searchField,
      robots: state.requestRobots.robots,
      isPending: state.requestRobots.isPending,
      error: state.requestRobots.error
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
      onRequestRobots: () => dispatch(requestRobots())
   }
};

class App extends Component {
   componentDidMount() {
      // Grabbing data from local json
      // this.setState({ robots: robots })

      // Fetch data from API and error handling
      this.props.onRequestRobots();
      // Test Loading if response had delay
      // .then(users => {});
      console.log('The componentDidMount is triggered as last');
   }

   render() {
      const { searchField, onSearchChange, robots, isPending } = this.props;
      // filter per robot
      const filteredRobots = robots.filter(robot => {
         return robot.name
             .toLowerCase()
             .includes(searchField.toLowerCase()
             );
      });
      console.log('The Rendering happens next');
      // In case of latency on fetching API
      return isPending ?
          <h1>Loading...</h1> :
          (
              <div className='tc'>
                 <Header />
                 <SearchBox searchChange={onSearchChange}/>
                 <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                 </Scroll>
              </div>
          );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
