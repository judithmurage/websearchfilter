// Create the map
const map = L.map('map').setView([-1.2921, 37.5736], 6);

// Load a tile layer of Kenya from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// Sample institute data
const institutesData = [
  { name: 'Maasai Technical Training Institute', lat: -1.3749, lng: 36.9341, course: 'Electrical Engineering' },
  { name: 'Thika Technical Training Institute', lat: -1.0406, lng: 37.0747, course: 'Mechanical Engineering' },
  { name: 'Muranga Teachers College', lat: -0.9372, lng: 37.1776, course: 'Education' },
  { name: 'Nairobi Technical Training Institute', lat: -1.3152, lng: 36.8672, course: 'Engineering' },
  { name: 'Kenya Coast National Polytechnic', lat: -4.0421, lng: 39.6489, course: 'Marine Engineering' },
  { name: 'Kabete National Polytechnic', lat: -1.2534, lng: 36.7079, course: 'Civil Engineering' },
  { name: 'Eldoret Technical Training Institute', lat: 0.5270, lng: 35.2825, course: 'Automotive Engineering' },
  { name: 'Meru National Polytechnic', lat: 0.0472, lng: 37.6419, course: 'Information Technology' },
  { name: 'Kenya Technical Trainers College', lat: -1.2848, lng: 36.8122, course: 'Technical Training' },
  { name: 'Kiambu Institute of Science and Technology', lat: -1.1582, lng: 36.8379, course: 'Science and Technology' },
  { name: 'Embu Technical Training Institute', lat: -0.5955, lng: 37.5822, course: 'Electronics Engineering' },
  // Add more institute data...
];

// Add markers to the map and keep track of them
const markers = [];
institutesData.forEach(item => {
  const marker = L.marker([item.lat, item.lng]).bindPopup(`<b>${item.name}</b><br>Course: ${item.course}`);
  markers.push(marker);
});

// Add markers to the map
const markerGroup = L.layerGroup(markers).addTo(map);

// Filter markers based on selected course and search text
document.getElementById('course').addEventListener('change', updateMarkers);
document.getElementById('search').addEventListener('input', updateMarkers);
document.getElementById('reset').addEventListener('click', resetFilters);

function updateMarkers() {
  const selectedCourse = document.getElementById('course').value;
  const searchText = document.getElementById('search').value.toLowerCase();

  markerGroup.clearLayers(); // Clear existing markers
  
  markers.forEach(marker => {
    const markerContent = marker._popup._content.toLowerCase();
    if ((selectedCourse === 'All' || markerContent.includes(selectedCourse)) &&
        markerContent.includes(searchText)) {
      marker.addTo(markerGroup);
    }
  });
}

function resetFilters() {
  document.getElementById('course').value = 'All';
  document.getElementById('search').value = '';
  updateMarkers();
}
