import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import RouteLine from './RouteLine'

interface LocationPoint {
	lat: number
	lng: number
	title?: string
}

interface MapProps {
	origin?: LocationPoint
	destination?: LocationPoint
	departureLocationInMap?: LocationPoint
	arrivalLocationInMap?: LocationPoint
	zoom?: number
	height?: string
	width?: string
}

const MapRender: React.FC<MapProps> = ({
	origin,
	destination,
	departureLocationInMap,
	arrivalLocationInMap,
	zoom = 7,
	height = '500px',
	width = '100%',
}) => {
	const originPoint = departureLocationInMap ||
		origin || { lat: 23.8103, lng: 90.4125, title: 'Dhaka' }
	const destinationPoint = arrivalLocationInMap ||
		destination || { lat: 21.4272, lng: 92.0058, title: "Cox's Bazar" }

	const centerLat = (originPoint.lat + destinationPoint.lat) / 2
	const centerLng = (originPoint.lng + destinationPoint.lng) / 2

	return (
		<div className='w-full' style={{ height, width }}>
			<MapContainer
				center={[centerLat, centerLng]}
				zoom={zoom}
				className='h-full w-full rounded-lg'
				scrollWheelZoom
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				/>

				{/* Origin Marker */}
				<CustomMarker
					position={[originPoint.lat, originPoint.lng]}
					label='A'
					bgColor='#4285f4'
				/>

				{/* Destination Marker */}
				<CustomMarker
					position={[destinationPoint.lat, destinationPoint.lng]}
					label='B'
					bgColor='#ea4335'
				/>

				{/* Route */}
				<RouteLine
					origin={[originPoint.lat, originPoint.lng]}
					destination={[destinationPoint.lat, destinationPoint.lng]}
				/>
			</MapContainer>
		</div>
	)
}

export default MapRender
