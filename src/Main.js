import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Map from './Map';
import './main.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const Main = () => {
	const [ activeSidebar, setActiveSidebar ] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		async function getDataFromApi() {
			let res = await Promise.all([
				axios.get(`http://localhost:5000/data/1`)
				// axios.get(`http://localhost:5000/data/2`),
				// axios.get(`http://localhost:5000/data/3`)
				// axios.get(`http://localhost:5000/data/4`),
				// axios.get(`http://localhost:5000/data/5`),
				// axios.get(`http://localhost:5000/data/6`),
				// axios.get(`http://localhost:5000/data/7`),
				// axios.get(`http://localhost:5000/data/8`),
				// axios.get(`http://localhost:5000/data/9`),
				// axios.get(`http://localhost:5001/data/10`),
				// axios.get(`http://localhost:5001/data/11`),
				// axios.get(`http://localhost:5001/data/12`),
				// axios.get(`http://localhost:5001/data/13`),
				// axios.get(`http://localhost:5001/data/14`),
				// axios.get(`http://localhost:5001/data/15`),
				// axios.get(`http://localhost:5001/data/16`),
				// axios.get(`http://localhost:5001/data/17`),
				// axios.get(`http://localhost:5001/data/18`),
				// axios.get(`http://localhost:5001/data/19`),
				// axios.get(`http://localhost:5002/data/20`),
				// axios.get(`http://localhost:5002/data/21`),
				// axios.get(`http://localhost:5002/data/22`),
				// axios.get(`http://localhost:5002/data/23`),
				// axios.get(`http://localhost:5002/data/24`),
				// axios.get(`http://localhost:5002/data/25`),
				// axios.get(`http://localhost:5002/data/26`),
				// axios.get(`http://localhost:5002/data/27`),
				// axios.get(`http://localhost:5002/data/28`),
				// axios.get(`http://localhost:5002/data/29`),
				// axios.get(`http://localhost:5003/data/30`),
				// axios.get(`http://localhost:5003/data/31`),
				// axios.get(`http://localhost:5003/data/32`),
				// axios.get(`http://localhost:5003/data/33`),
				// axios.get(`http://localhost:5003/data/34`),
				// axios.get(`http://localhost:5003/data/35`),
				// axios.get(`http://localhost:5003/data/36`),
				// axios.get(`http://localhost:5003/data/37`),
				// axios.get(`http://localhost:5003/data/38`),
				// axios.get(`http://localhost:5003/data/39`),
				// axios.get(`http://localhost:5003/data/40`)
			]);
			const newData = { type: 'FeatureCollection', features: [] };
			res.forEach((response) => {
				newData.features = [ ...newData.features, ...response.data.data[0].jsonb_build_object.features ];
			});
			setData(newData);
		};
		getDataFromApi();
	}, [])

	const [loading, setLoading] = useState('');
	useEffect(()=>{
		if(!data){
			setLoading('Loading spatial data from server...')
		}else{
			setLoading('')
		}
	},[data])
	const [weightsDone, setWeightsDone]=useState(false);

	return (
		<div>
			<Sidebar activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar} setWeightsDone={setWeightsDone} setData={setData} setLoading={setLoading}/>
			<div style={{ height: '100%', position: 'relative' }} className="content">
				<Button
					style={{ position: 'absolute', top: '80px', left: '50px', zIndex: 1 }}
					variant="secondary"
					onClick={() => {
						setActiveSidebar(true);
					}}
				>
					Start
				</Button>
				<Map weightsDone={weightsDone} data={data}/>
				{loading && <div className='loadingbar'>
				    <Spinner animation="border" />
					<span>{loading}</span>
				</div>}
			</div>
		</div>
	);
};

export default Main;
