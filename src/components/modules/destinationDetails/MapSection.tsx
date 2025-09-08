import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MapRender from '../map/MapRender'

interface Location {
	lat: number
	lng: number
	title: string
}

interface MapSectionProps {
	origin: Location
	destination: Location
}

const MapSection: React.FC<MapSectionProps> = ({ origin, destination }) => {
	return (
		<Card className='dark:bg-gray-800'>
			<CardHeader>
				<CardTitle className='text-2xl'>Map</CardTitle>
			</CardHeader>
			<CardContent>
				<MapRender
					origin={origin}
					destination={destination}
					height='500px'
					zoom={8}
				/>
			</CardContent>
		</Card>
	)
}

export default MapSection
