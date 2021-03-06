import React, { useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import { dataLayer, dataLayerHightLight } from './map-style';
import ControlPanel from './ControlPanel';
import Legend from './Legend';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1Y2swNTIwIiwiYSI6ImNrMDk2NDFhNTA0bW0zbHVuZTk3dHQ1cGUifQ.dkjP73KdE6JMTiLcUoHvUA';

const Map = ({ weightsDone, data }) => {
	const [ viewport, setViewport ] = useState({
		latitude: 27.8,
		longitude: -88.4,
		zoom: 6,
		bearing: 0,
		pitch: 0
	});
	const [ filter, setFilter ] = useState([ 'in', 'OBJECTID', '' ]);
	const [ hoverInfo, setHoverInfo ] = useState(null);
	const onHover = (e) => {
		let objectId = '';
		let hoveredInfo = null;
		if (e.features) {
			
				const hexagonHovered = e.features[0];
				if (hexagonHovered) {
					hoveredInfo = {
						hexagon: hexagonHovered.properties
					};
					objectId = hexagonHovered.properties.OBJECTID;
				}
				
		}
		setHoverInfo(hoveredInfo);
		setFilter([ 'in', 'OBJECTID', objectId ? objectId:"" ]);
	};

	return (
		<MapGL
			{...viewport}
			style={{ position: 'fixed' }}
			width="100vw"
			height="100vh"
			mapStyle="mapbox://styles/mapbox/light-v9"
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onClick={onHover}
		>
			{weightsDone && (
				<>
				<Source type="vector" url="mapbox://chuck0520.7z43f6wi" maxzoom={14} minzoom={9}>
					<Layer
						{...dataLayer}
						paint={{
							'fill-color': data,
							'fill-opacity': [ 'case', [ 'boolean', [ 'feature-state', 'hover' ], false ], 1, 0.5 ]
						}}
					/>
					<Layer {...dataLayerHightLight} filter={filter} />
				</Source>
				<ControlPanel hoverInfo={hoverInfo?hoverInfo:{hexagon:{}}}></ControlPanel>
				<Legend></Legend>
				</>
			)}
		</MapGL>
	);
};

export default Map;
