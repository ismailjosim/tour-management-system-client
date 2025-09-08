import L, { DivIcon } from 'leaflet'
import { Marker } from 'react-leaflet'

interface CustomMarkerProps {
	position: [number, number]
	label: string
	bgColor: string
}

const CustomMarker = ({ position, label, bgColor }: CustomMarkerProps) => {
	const icon: DivIcon = L.divIcon({
		html: `<div style="
        background: ${bgColor};
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        ${label}
      </div>`,
		iconSize: [24, 24],
		iconAnchor: [12, 12],
	})

	return <Marker position={position} icon={icon} />
}
export default CustomMarker
