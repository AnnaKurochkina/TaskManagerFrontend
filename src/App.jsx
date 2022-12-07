import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import TaskList from "./components/TaskList/TaskList";
import './App.scss';

function App() {

	return (
		<Router>
			<Nav/>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route exact path="TaskList/:listId" element={<TaskList/>}/>
				</Routes>
			</Suspense>
		</Router>
	);	
}

export default App;
