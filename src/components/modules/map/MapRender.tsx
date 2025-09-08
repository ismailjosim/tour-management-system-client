import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import RouteLine from './RouteLine'

interface LocationPoint {
	lat: number
	lng: number
	title?: string
}

interface ContactMapProps {
	origin?: LocationPoint
	destination?: LocationPoint
	zoom?: number
	height?: string
	width?: string
}

const MapRender: React.FC<ContactMapProps> = ({
	origin = { lat: 23.8103, lng: 90.4125, title: 'Dhaka' },
	destination = { lat: 21.4272, lng: 92.0058, title: "Cox's Bazar" },
	zoom = 7,
	height = '400px',
	width = '100%',
}) => {
	const centerLat = (origin.lat + destination.lat) / 2
	const centerLng = (origin.lng + destination.lng) / 2

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
					position={[origin.lat, origin.lng]}
					label='A'
					bgColor='#4285f4'
				/>

				{/* Destination Marker */}
				<CustomMarker
					position={[destination.lat, destination.lng]}
					label='B'
					bgColor='#ea4335'
				/>

				{/* Route */}
				<RouteLine
					origin={[origin.lat, origin.lng]}
					destination={[destination.lat, destination.lng]}
				/>
			</MapContainer>
		</div>
	)
}

export default MapRender
