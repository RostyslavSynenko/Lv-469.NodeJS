mapboxgl.accessToken =
  'pk.eyJ1IjoicnN5bmVua28iLCJhIjoiY2s0aXM1a3RmMDM2NTNkbWxrdGVoeWY3MyJ9.qTMel7HOzOAkoLlmLAMFJA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 15,
  center: [2.12282, 41.380898],
});

// map.flyTo({center: [2.12282, 41.380898], zoom: 15});
