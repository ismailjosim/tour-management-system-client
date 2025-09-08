import { useState } from 'react'
import LocationInput from './LocationInput'

interface Location {
	lat: number
	lng: number
	title: string
}

const MapLocationInput = () => {
	const [origin, setOrigin] = useState<Location | null>(null)
	const [destination, setDestination] = useState<Location | null>(null)
	console.log({ origin, destination })
	return (
		<div>
			<LocationInput onSelect={setOrigin} />
			<LocationInput onSelect={setDestination} />
		</div>
	)
}

export default MapLocationInput
