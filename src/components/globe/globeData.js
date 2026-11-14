// Real coordinates as [longitude, latitude]. Home cities (India) show no label of their own,
// the single "India" label is drawn separately in GlobeHero.
export const PLACES = {
  Delhi: { ll: [77.21, 28.61], home: true },
  Mumbai: { ll: [72.88, 19.08], home: true },
  Hyderabad: { ll: [78.49, 17.39], home: true },
  Bangalore: { ll: [77.59, 12.97], home: true },
  'New York': { ll: [-74.01, 40.71], label: 'New York, United States', short: 'New York', side: 1 },
  'San Francisco': { ll: [-122.42, 37.77], label: 'San Francisco, United States', short: 'San Francisco', side: -1 },
  London: { ll: [-0.13, 51.51], label: 'London, United Kingdom', short: 'London', side: -1 },
  Dubai: { ll: [55.27, 25.2], label: 'Dubai, UAE', short: 'Dubai', side: -1 },
  Singapore: { ll: [103.82, 1.35], label: 'Singapore', short: 'Singapore', side: 1 },
  Tokyo: { ll: [139.65, 35.68], label: 'Tokyo, Japan', short: 'Tokyo', side: 1 },
};

// s and e are the start and end of each route on the 0 to 1 timeline.
export const ROUTES = [
  { a: 'Delhi', b: 'New York', s: 0.0, e: 0.14, intro: true },
  { a: 'Mumbai', b: 'New York', s: 0.02, e: 0.16, intro: true },
  { a: 'Delhi', b: 'San Francisco', s: 0.04, e: 0.2, intro: true },
  { a: 'Mumbai', b: 'London', s: 0.4, e: 0.54 },
  { a: 'Mumbai', b: 'Dubai', s: 0.42, e: 0.52 },
  { a: 'Bangalore', b: 'Singapore', s: 0.68, e: 0.78 },
  { a: 'Hyderabad', b: 'Tokyo', s: 0.7, e: 0.82 },
];

// Camera keyframes on the 0 to 1 timeline: lo and la are the longitude and latitude the camera faces.
export const KEYS = [
  { p: 0.0, lo: 74, la: 22, z: 1.0 },
  { p: 0.1, lo: 74, la: 22, z: 1.0 },
  { p: 0.28, lo: -92, la: 32, z: 1.0 },
  { p: 0.36, lo: -92, la: 32, z: 1.0 },
  { p: 0.56, lo: 28, la: 36, z: 1.0 },
  { p: 0.64, lo: 28, la: 36, z: 1.0 },
  { p: 0.82, lo: 100, la: 14, z: 1.0 },
  { p: 0.9, lo: 100, la: 14, z: 1.0 },
  { p: 1.0, lo: 74, la: 22, z: 0.94 },
];

// Seconds for one full trip around the world and back.
export const LOOP_SECONDS = 44;
