import React, { useState } from 'react'

interface Location {
	lat: number
	lng: number
	title: string
}

interface LocationInputProps {
	onSelect: (location: Location) => void
}

interface NominatimPlace {
	place_id: number
	display_name: string
	lat: string
	lon: string
}

const LocationInput: React.FC<LocationInputProps> = ({ onSelect }) => {
	const [query, setQuery] = useState<string>('')
	const [results, setResults] = useState<NominatimPlace[]>([])

	const searchLocation = async () => {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
				query,
			)}`,
		)
		const data: NominatimPlace[] = await res.json()
		setResults(data)
	}

	return (
		<div className='p-4'>
			<input
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Enter city or place...'
				className='border px-2 py-1 rounded'
			/>
			<button
				onClick={searchLocation}
				className='ml-2 px-3 py-1 bg-blue-500 text-white rounded'
			>
				Search
			</button>

			<ul>
				{results.map((place) => (
					<li
						key={place.place_id}
						className='cursor-pointer hover:underline'
						onClick={() =>
							onSelect({
								lat: parseFloat(place.lat),
								lng: parseFloat(place.lon),
								title: place.display_name,
							})
						}
					>
						{place.display_name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default LocationInput
