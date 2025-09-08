import { useEffect, useState } from 'react'
import { Polyline } from 'react-leaflet'
import RouteInfoLabel from './RouteInfoLabel'

interface RouteLineProps {
	origin: [number, number]
	destination: [number, number]
}

export default function RouteLine({ origin, destination }: RouteLineProps) {
	const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
		[],
	)
	const [routeInfo, setRouteInfo] = useState<{
		distance: string
		duration: string
	} | null>(null)

	useEffect(() => {
		const fetchRoute = async () => {
			try {
				const response = await fetch(
					`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`,
				)
				if (response.ok) {
					const data = await response.json()
					if (data.routes?.length > 0) {
						const route = data.routes[0]
						const coordinates: [number, number][] =
							route.geometry.coordinates.map((coord: number[]) => [
								coord[1],
								coord[0],
							])
						setRouteCoordinates(coordinates)

						// Calculate route info
						const distanceKm = Math.round(route.distance / 1000)
						const durationHours = Math.floor(route.duration / 3600)
						const durationMinutes = Math.round((route.duration % 3600) / 60)

						const duration =
							durationHours > 0
								? `${durationHours} hr ${durationMinutes} min`
								: `${durationMinutes} min`

						setRouteInfo({ distance: `${distanceKm} km`, duration })
					}
				}
			} catch (error) {
				console.error('Error fetching route:', error)
			}
		}

		fetchRoute()
	}, [origin, destination])

	if (!routeCoordinates.length) return null

	const midIndex = Math.floor(routeCoordinates.length / 2)
	const labelPosition = routeCoordinates[midIndex]

	return (
		<>
			<Polyline
				positions={routeCoordinates}
				color='#4285f4'
				weight={5}
				opacity={0.8}
			/>
			{routeInfo && (
				<RouteInfoLabel
					position={labelPosition}
					distance={routeInfo.distance}
					duration={routeInfo.duration}
				/>
			)}
		</>
	)
}
