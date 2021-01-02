import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGh1bmduZ3V5ZW45MjkzIiwiYSI6ImNrajJvaXN2ajI5OG8yeHF0YWR6bG80dTAifQ.rMxODYbkS7dHfXgG8z4Uug";

const MapContainer = () => {
  const mapRef = useRef();

  // const el = document.createElement("div");
  // el.className = "marker";
  // el.style.backgroundImage = "url('/images/bud-icon-red.png')";

  const initialMap = () => {
    let map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106.6923, 10.7571],
      zoom: 13,
    });

    // new mapboxgl.Marker(el).setLngLat([106.6923, 10.7571]).addTo(map);
    // map.loadImage(Budweiser, (error, image) => {
    //   if (error) throw error;
    //   map.addImage('budweiser', Budweiser);
    //   map.addSource('budweiser_location', {
    //     type: 'geojson',
    //     data: {
    //       type: 'Point',
    //       coordinates: [106.6923, 10.7571],
    //     },
    //   });
    //   map.addLayer({
    //     id: 'budweiser_location',
    //     source: 'budweiser_location',
    //     type: 'symbol',
    //     layout: {
    //       'icon-image': 'budweiser',
    //       'icon-size': 0.9,
    //       'icon-allow-overlap': true,
    //       'icon-ignore-placement': true,
    //     },
    //   });
    // });
  };

  useEffect(() => {
    initialMap();
  }, []);

  return (
    <div className="wrapperMap">
      <div ref={mapRef} />
      <style jsx>
        {`
          .wrapperMap {
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default MapContainer;
