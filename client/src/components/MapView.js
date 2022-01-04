import { useState, useEffect } from 'react';
import { Marker, MapContainer, TileLayer, Popup } from 'react-leaflet';
import L from 'leaflet';
import tileLayer from '../util/tileLayer';

const center = [52.22977, 21.01178];

const removeMarker = (index, map, legend) => {
  map.eachLayer((layer) => {
    let id = layer._zIndex;
    if (layer.options && layer.options.pane === "markerPane") {
      if (layer.options.uniceid === index) {
        map.removeLayer(layer);
        legend.textContent = 'Current marker deleted';

        const base_url = `http://localhost:4000/map/${id}`

        fetch(base_url, { method: 'DELETE' })
          .then(response => {
            const data = response.json();

            // check for error response
            if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }

            console.log('Delete successful');
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }
    }
  });
}

const ShowMarkers = ({ mapContainer, legend, markers }) => {
  return markers.map((marker, index) => {
    return <Marker
      key={index}
      uniceid={index}
      position={marker}
      draggable={true}
      eventHandlers={{
        moveend(e) {
          const { lat, lng } = e.target.getLatLng();
          legend.textContent = `change position: ${lat} ${lng}`;
        }
      }}
    >

      <Popup>
        Hello Marker {index} <br /><br />
        <button onClick={() => removeMarker(index, mapContainer, legend)}>delete marker</button>
      </Popup>
    </Marker>
  })
}

const MyMarkers = ({ map }) => {
  const [marker, setMarker] = useState([])
  const [legend, setLegend] = useState()

  // Read API to show all markers
  // const [allMap, setMap] = useState(null);

  // function getAllMarker() {
  //   fetch('http://localhost:4000/maps')
  //     .then(response => {
  //       setMap({ ...response.json() });
  //     })
  // }

  useEffect(() => {
    if (!map) return;
    const legend = L.control({ position: "bottomleft" });

    const info = L.DomUtil.create("div", "legend");

    legend.onAdd = () => {
      info.textContent = `click on the map, create the marker, move the marker & delete the marker`;
      return info;
    };

    legend.addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const { y } = e.containerPoint;
      let id = y;

      setMarker(mar => [...mar, [lat, lng]]);

      const base_url = "http://localhost:4000/map"
      fetch(base_url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, lat, lng })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      info.textContent = `New marker: ${e.latlng}`;
      setLegend(info);
    })

    // getAllMarker();

  }, [map]);

  return marker.length > 0 && legend !== undefined ? (
    <ShowMarkers
      mapContainer={map}
      legend={legend}
      markers={marker} />
  )
    : null
}

const MapWrapper = () => {
  const [map, setMap] = useState(null);
  return (
    <MapContainer
      whenCreated={setMap}
      center={center}
      zoom={18}
      scrollWheelZoom={true}
    >

      <TileLayer {...tileLayer} />

      <MyMarkers map={map} />

    </MapContainer>
  )
}

export default MapWrapper;

