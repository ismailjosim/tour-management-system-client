import L, { DivIcon } from 'leaflet'
import { Marker } from 'react-leaflet'

interface RouteInfoLabelProps {
	position: [number, number]
	distance: string
	duration: string
}

const RouteInfoLabel = ({
	position,
	distance,
	duration,
}: RouteInfoLabelProps) => {
	const icon: DivIcon = L.divIcon({
		html: `
      <div style="
        background: white;
        padding: 6px 12px;
        border-radius: 20px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        border: 2px solid #4285f4;
        font-size: 13px;
        font-weight: 600;
        color: #4285f4;
        white-space: nowrap;
        text-align: center;
      ">
        <div>${duration}</div>
        <div style="color: #666; font-size: 11px; font-weight: normal;">${distance}</div>
      </div>
    `,
		iconSize: [100, 40],
		iconAnchor: [50, 20],
		className: 'route-info-label',
	})

	return <Marker position={position} icon={icon} />
}
export default RouteInfoLabel
