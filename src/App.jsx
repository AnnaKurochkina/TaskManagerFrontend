import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import TaskList from "./components/TaskList/TaskList";
import './App.scss';
import Weather from "./components/Weather/Weather";
import { useState, useEffect } from 'react';

function App() {

	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	const showPosition = (position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	}

	const getLocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			return "Geolocation is not supported by your browser.";
		}
	}

	useEffect(() => {
		getLocation();
	}, [latitude, longitude]);

	return (
		<div className="app">
		<Router>
			<Home geoLongitude={longitude} geoLatitude={latitude} />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Home geoLongitude={longitude} geoLatitude={latitude}/>} />
					<Route exact path="TaskList/:listId" element={<TaskList/>}/>
				</Routes>
			</Suspense>
		</Router>
		</div>
	);	
}

export default App;
