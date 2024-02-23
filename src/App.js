import { useState } from 'react';
import './App.css';
import LiveFeed from './components/LiveFeed';

function App() {

	const [imageData, setImageData] = useState('');

	const handleNewImageData = (newImageData) => {
		setImageData(imageData + "\n\n" + newImageData);
	};


  return (
	
    <div className='App'>
		<h1>Morgan Freeman Describing you</h1>
		<div className="actionScreen">
			<div className="userFeedWrapper">
				<h2>Live Feed</h2>
				<LiveFeed onCapture={handleNewImageData}/>
			</div>
			<div className="logScreenWrapper">
				<h2>Logs</h2>
				<div className="logScreen">
					<p>{imageData}</p>
				</div>
			</div>
		</div>
	</div>
  );
}

export default App;
