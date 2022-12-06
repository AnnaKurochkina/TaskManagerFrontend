import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import TaskList from "./components/TaskList/TaskList";
import './App.scss';

function App() {

	const [message, setMessage] = useState("");

	const getMessage = async () => {
		const url = `http://localhost:8080/`;
		const res = await fetch(url);
		const text = await res.text();
		setMessage(text);
	};

	useEffect(() => {
		getMessage();
	}, []);

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
