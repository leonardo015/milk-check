import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

export default function Map({ handleClick, farmName, marker }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (marker) {
      setMarkerPosition(marker);
    }
  }, [marker]);

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  const LocationMarker = () => {
    if (handleClick) {
      const map = useMapEvents({
        click(e) {
          map.locate();
          handleClick(e.latlng);
          setMarkerPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
        locationfound(e) {},
      });
    }

    return markerPosition === null ? null : (
      <Marker position={markerPosition}>
        {farmName ? <Popup>{farmName}</Popup> : null}
      </Marker>
    );
  };

  return (
    <MapContainer
      center={marker ? [marker.lat, marker.lng] : [-15, -55]}
      zoom={marker ? 12 : 5}
      style={{ height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
