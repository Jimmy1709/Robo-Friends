import React, {Component} from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends Component  {
	constructor () {
		super()
		this.state = {
			robots : [],
	        searchfield : ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(user => this.setState({robots : user}));
	}

  	onSearchChange = (event) => {
  		this.setState({searchfield : event.target.value})
  	}

	render(){
		const { robots, searchfield} = this.state;
		const filteredRobot = robots.filter(robot => {
  		   return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  		})
  		if (robots.length ===0){
  			return <h1>Loading </h1>
  		}else {
  		  return (
	       <div className='tc'>	
		     <h1> RoboFriends</h1>
		     <SearchBox searchChange={this.onSearchChange}/>
		     <Scroll>
		       <ErrorBoundary>
		         <Cardlist robots={filteredRobot}/>
		       </ErrorBoundary>  
		     </Scroll>
	       </div>	
	    );
       }
  	}
}

export default App;