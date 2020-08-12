import React, { useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import { dataLayer } from './map-style';
import { Table } from 'react-bootstrap';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA';

const Map = ({ weightsDone, data }) => {

	const [ viewport, setViewport ] = useState({
		latitude: 27.8,
		longitude: -88.4,
		zoom: 5,
		bearing: 0,
		pitch: 0
	});
	const [ hoveredFeature, setHoveredFeature ] = useState(null);
	const [ coord, setCoord ] = useState([]);
	const onHover = (event) => {
		const { features, srcEvent: { offsetX, offsetY } } = event;
		const hoveredFeature = features && features.find((f) => f.layer.id === 'data');
		setHoveredFeature(hoveredFeature);
		setCoord([ offsetX, offsetY ]);
	};

	function renderTooltip() {
		return (
			hoveredFeature && (
				<div className="map tooltip" style={{ left: coord[0], top: coord[1] }}>
					<div>
						<strong>Hexagon detail: </strong>
						<p>Value: {hoveredFeature.properties.value}</p>
					</div>
					<div>
						<Table striped bordered size="sm" variant="light">
							<tbody>
								<tr>
									<td colSpan="2">
										<b>Habitat: </b>{' '}
									</td>
								</tr>
								<tr>
									<td>Padus:</td>
									<td>{hoveredFeature.properties.hab1}</td>
								</tr>
								<tr>
									<td>Structural Connectivity:</td>
									<td>{hoveredFeature.properties.hab2}</td>
								</tr>
								<tr>
									<td>Threat of Urbanization:</td>
									<td>{hoveredFeature.properties.hab3}</td>
								</tr>
								<tr>
									<td>Composition of Natural Lands:</td>
									<td>{hoveredFeature.properties.hab4}</td>
								</tr>
								<tr>
									<td colSpan="2">
										<b>Water Quality: </b>{' '}
									</td>
								</tr>
								<tr>
									<td>Impaired Watershed Area:</td>
									<td>{hoveredFeature.properties.wq1}</td>
								</tr>
								<tr>
									<td>Stream Abundance:</td>
									<td>{hoveredFeature.properties.wq2}</td>
								</tr>
								<tr>
									<td>Hydrologic Response to Land-use:</td>
									<td>{hoveredFeature.properties.wq3}</td>
								</tr>
								<tr>
									<td colSpan="2">
										<b>LCMR:</b>{' '}
									</td>
								</tr>
								<tr>
									<td>Biodiversity Index: </td>
									<td>{hoveredFeature.properties.lcmr1}</td>
								</tr>
								<tr>
									<td>T&E Area:</td>
									<td>{hoveredFeature.properties.lcmr2}</td>
								</tr>
								<tr>
									<td>T&E Count:</td>
									<td>{hoveredFeature.properties.lcmr3}</td>
								</tr>
								<tr>
									<td>Light Pollution Index:</td>
									<td>{hoveredFeature.properties.lcmr4}</td>
								</tr>
								<tr>
									<td colSpan="2">
										<b>Community Resilience:</b>{' '}
									</td>
								</tr>
								<tr>
									<td>National Register of Historic Places: </td>
									<td>{hoveredFeature.properties.cl1}</td>
								</tr>
								<tr>
									<td>National Heritage Area:</td>
									<td>{hoveredFeature.properties.cl2}</td>
								</tr>
								<tr>
									<td>Social Vulnerability Index:</td>
									<td>{hoveredFeature.properties.cl3}</td>
								</tr>
								<tr>
									<td>Community Threat Index:</td>
									<td>{hoveredFeature.properties.cl4}</td>
								</tr>
								<tr>
									<td colSpan="2">
										<b>Economy:</b>{' '}
									</td>
								</tr>
								<tr>
									<td>Working Lands: </td>
									<td>{hoveredFeature.properties.eco1}</td>
								</tr>
								<tr>
									<td>Commercial Fishery Index:</td>
									<td>{hoveredFeature.properties.eco2}</td>
								</tr>
								<tr>
									<td>Recreational Fishery Index:</td>
									<td>{hoveredFeature.properties.eco3}</td>
								</tr>
								<tr>
									<td>Access & Recreation:</td>
									<td>{hoveredFeature.properties.eco4}</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
			)
		);
	}

	return (
		<MapGL
			{...viewport}
			style={{ position: 'fixed' }}
			width="100vw"
			height="100vh"
			mapStyle="mapbox://styles/mapbox/light-v9"
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onHover={onHover}
		>
			{weightsDone && (
				<Source type="geojson" data={data}>
					<Layer {...dataLayer} />
				</Source>
				
			)}
			{renderTooltip()}
		</MapGL>
	);
};

export default Map;
