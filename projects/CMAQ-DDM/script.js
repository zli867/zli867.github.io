// Initialize map
var map = L.map('map').setView([34.05, -118.25], 9);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Site data
var locations = {
  'Azusa': [-117.923897, 34.136398],
  'Glendora': [-117.85038, 34.14437],
  'West LA': [-118.456665, 34.050556],
  'LA North Main': [-118.2267, 34.066399],
  'Reseda': [-118.53275, 34.1992],
  'Burbank': [-118.316902, 34.1758],
  'Pico Rivera': [-118.0685, 34.01029],
  'Pomona': [-117.75138, 34.06698],
  'Pasadena': [-118.12714, 34.13265],
  'Long Beach': [-118.189445, 33.824165],
  'LAX': [-118.43049, 33.95507],
  'Santa Clarita': [-118.52839, 34.38337],
  'Anaheim': [-117.91876, 33.81931],
  'Mission Viejo': [-117.67588, 33.63005],
  'La Habra': [-117.95259, 33.92505],
  'Banning': [-116.85841, 33.92077],
  'Perris': [-117.22764, 33.78933],
  'Riverside': [-117.394997, 33.953056],
  'Lake Elsinore': [-117.33104, 33.67653],
  'Crestline': [-117.275558, 34.24139],
  'Upland': [-117.628891, 34.103333],
  'Fontana': [-117.492226, 34.100555],
  'Redlands': [-117.14734, 34.05965],
  'San Bernardino': [-117.27406, 34.10668]
};


var activeMarker = null;

// Resizer functionality
const resizer = document.getElementById('resizer');
const sidebar = document.getElementById('sidebar');
const mapDiv = document.getElementById('map');

const SIDEBAR_MIN_PERCENT = 10;
const SIDEBAR_MAX_PERCENT = 80;

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;

  const windowWidth = window.innerWidth;
  const newWidthPx = windowWidth - e.clientX;
  const newWidthPercent = (newWidthPx / windowWidth) * 100;

  // Keep within bounds
  if (newWidthPercent >= SIDEBAR_MIN_PERCENT && newWidthPercent <= SIDEBAR_MAX_PERCENT) {
    sidebar.style.width = newWidthPercent + '%';
    if (window.map) map.invalidateSize(); // Ensure map updates correctly
  }
});

document.addEventListener('mouseup', () => {
  if (isResizing) {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }
});


/**
 * Update the sidebar dynamically with fixed sections and figures for a site.
 * @param {string} site - Site name
 * @param {Array} coord - [longitude, latitude]
 */
function updateSidebar(site, coord) {
  // Construct paths for all figures
  const figures = {
    logQuadratic: `./Figures/Compare log and quadratic/${site}_compare_log_quadratic.png`,
    trajCMAQ: `./Figures/Traj_CMAQ/${site}_compare_CMAQ_traj.png`,
    dataWithholding: `./Figures/Data Withholding/${site}_data_withholding.png`,
    trajEmp: `./Figures/Traj_Emp/${site}_compare_traj.png`,
    Comparisons: `./Figures/Compare Quadratic Emp/${site}_compare_quadratic_emp.png`
  };

  // Build HTML string
  let html = `
    <h1>${site}</h1>
    <p><b>Latitude:</b> ${coord[1].toFixed(4)}<br>
       <b>Longitude:</b> ${coord[0].toFixed(4)}</p>

    <h2>CMAQ-HDDM-based Ozone Isopleths</h2>

    <h3>Quadratic and Log-Quadratic Model Comparisons</h3>
    <figure>
      <img src="${figures.logQuadratic}" 
           style="width:100%; margin-top:10px; border:1px solid #ccc; border-radius:6px;" 
           loading="lazy" 
           onerror="this.style.display='none'">
      <figcaption style="text-align:center;">Comparisons between the CMAQ-HDDM-derived quadratic model and log-quadratic model ozone-emission concentrations and sensitivity isopleth for Crestline. The first column shows the quadratic model-based isopleths. The second column shows the log-quadratic model-based isopleths. The third column shows the difference between those two. The first row is the ozone concentration isopleths; the second row is the ozone-to-NOx emissions sensitivity isopleths; and the third row is the ozone-to-VOC emissions sensitivity isopleths. The black dashed line indicates the zero-NOx-sensitivity line, and the white dashed line indicates the equal-NOx-VOC sensitivity line.</figcaption>
    </figure>

    <h3>Least Square Fitting Performance</h3>
    <figure>
      <img src="${figures.trajCMAQ}" 
           style="width:100%; margin-top:10px; border:1px solid #ccc; border-radius:6px;" 
           loading="lazy" 
           onerror="this.style.display='none'">
      <figcaption style="text-align:center;">Comparisons between CMAQ-HDDM estimates and values reconstructed using the quadratic and log-quadratic models, including ozone, ozone to NOx sensitivity, and ozone to VOC sensitivity. Comparisons between CMAQ-HDDM and the quadratic model are shown as triangle markers, while those between CMAQ-HDDM and the log-quadratic model are shown as square markers. The red and blue lines represent the regression relationships between CMAQ-HDDM and the quadratic and log-quadratic models, respectively. Point colors indicate different emission levels used in the CMAQ-HDDM simulations.</figcaption>
    </figure>

    <h3>Uncertainty of CMAQ-HDDM-based Ozone Isopleths</h3>
    <figure>
      <img src="${figures.dataWithholding}" 
           style="width:100%; margin-top:10px; border:1px solid #ccc; border-radius:6px;" 
           loading="lazy" 
           onerror="this.style.display='none'">
      <figcaption style="text-align:center;">Mean bias (first row) and standard bias (second row) of CMAQ-HDDM-based isopleths. The first column and second column show the uncertainties of the isopleth developed by using the quadratic model and the log-quadratic model, respectively. The white crosses indicate the 15 emission levels used in the isopleth development.</figcaption>
    </figure>

    <h3>Comparisons between Observation and CMAQ-HDDM-based Ozone Isopleth</h3>
    <figure>
      <img src="${figures.Comparisons}" 
           style="width:100%; margin-top:10px; border:1px solid #ccc; border-radius:6px;" 
           loading="lazy" 
           onerror="this.style.display='none'">
      <figcaption style="text-align:center;">Comparisons between the CMAQ-HDDM-based (quadratic model) and the observation-derived (log-quadratic model) ozone-emission concentrations and sensitivity isopleth for Crestline. The first column shows the observation-derived isopleths. The second column shows the CMAQ-HDDM-based isopleths. The third column shows the difference between those two. The first row is the ozone concentration isopleths; the second row is the ozone-to-NOx emissions sensitivity isopleths; and the third row is the ozone-to-VOC emissions sensitivity isopleths. The black dashed line indicates the zero-NOx-sensitivity line, and the white dashed line indicates the equal-NOx-VOC sensitivity line.</figcaption>
    </figure>

    <h3>Ozone Concentrations and Sensitivities under Historical Emission Levels</h3>
    <figure>
      <img src="${figures.trajEmp}" 
           style="width:100%; margin-top:10px; border:1px solid #ccc; border-radius:6px;" 
           loading="lazy" 
           onerror="this.style.display='none'">
      <figcaption style="text-align:center;">The comparison of observed ozone with CMAQ-HDDM- and observation-derived model estimates along emission levels from 1985 to 2019 (first row). Comparisons between HDDM-derived and observation-derived sensitivity trends along emission levels from 1985 to 2019 (second row). The color indicates the year of the points. The dashed line indicated the 1:1 reference line.</figcaption>
    </figure>
  `;

  // Update sidebar container
  document.getElementById('info').innerHTML = html;
}




// Loop through sites and add markers with labels
for (let site in locations) {
  let coord = locations[site];

  // Circle marker
  let circle = L.circleMarker([coord[1], coord[0]], {
    radius: 7,
    color: '#0077cc',
    fillColor: '#3399ff',
    fillOpacity: 0.8
  }).addTo(map);

  // Text label
  let label = L.marker([coord[1], coord[0]], {
    icon: L.divIcon({
      className: 'label-text',
      html: site,
      iconSize: [60, 20],
      iconAnchor: [30, -10]
    }),
    interactive: false
  }).addTo(map);

    circle.on('click', function() {
    // Highlight marker
    if (activeMarker) activeMarker.setStyle({ color: '#0077cc', fillColor: '#3399ff' });
    this.setStyle({ color: '#ff6600', fillColor: '#ff9933' });
    activeMarker = this;

    // Zoom to site
    map.flyTo([coord[1], coord[0]], 11);

    // Update sidebar
    updateSidebar(site, coord);
    });

}
