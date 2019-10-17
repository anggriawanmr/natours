/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5nZ3JpYXdhbm1yIiwiYSI6ImNrMXRlY3c1bzA2dWMzb3A3Nm5pOWExNHoifQ.pKoXkyTS31TFE-lsVh7xuA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anggriawanmr/ck1tf0ftp1ogy1cp9b8abwuf7',
    scrollZoom: false
    // center: [106.812756, -6.154216],
    // zoom: 17
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extends(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
