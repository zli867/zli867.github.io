const content = {
  pm: {
    title: 'PM<sub>2.5</sub> · Spatial comparison',
    caption: 'Surface PM<sub>2.5</sub> concentration. The four panels compare simulated PM<sub>2.5</sub> across Freitas-SFIRE-CMAQ, WRF-SFIRE-Chem, SFIRE-FOAM-CMAQ, and SFIRE-CMAQ. Colors show surface PM<sub>2.5</sub> (µg m<sup>−3</sup>), and arrows indicate surface wind direction and speed. {sites} Black lines delineate the Fort Benning boundary and the prescribed-fire burn-unit boundary.',
    foot: 'PM<sub>2.5</sub> · absolute near-surface concentration'
  },
  o3: {
    title: 'O<sub>3</sub> · Spatial comparison',
    caption: 'Surface O<sub>3</sub> concentration. The four panels compare simulated O<sub>3</sub> across Freitas-SFIRE-CMAQ, WRF-SFIRE-Chem, SFIRE-FOAM-CMAQ, and SFIRE-CMAQ. Colors show surface O<sub>3</sub> (ppb), and arrows indicate surface wind direction and speed. {sites} Black lines delineate the Fort Benning boundary and the prescribed-fire burn-unit boundary.',
    foot: 'O<sub>3</sub> · absolute near-surface concentration'
  },
  dpm: {
    title: 'Δ PM<sub>2.5</sub> · Spatial comparison',
    caption: 'Surface ΔPM<sub>2.5</sub> concentration (fire − background). The four panels compare simulated ΔPM<sub>2.5</sub> across Freitas-SFIRE-CMAQ, WRF-SFIRE-Chem, SFIRE-FOAM-CMAQ, and SFIRE-CMAQ. Colors show surface ΔPM<sub>2.5</sub> (µg m<sup>−3</sup>), and arrows indicate surface wind direction and speed. {sites} Black lines delineate the Fort Benning boundary and the prescribed-fire burn-unit boundary.',
    foot: 'PM<sub>2.5</sub> impacts from prescribed-fire smoke'
  },
  do3: {
    title: 'Δ O<sub>3</sub> · Spatial comparison',
    caption: 'Surface ΔO<sub>3</sub> concentration (fire − background). The four panels compare simulated ΔO<sub>3</sub> across Freitas-SFIRE-CMAQ, WRF-SFIRE-Chem, SFIRE-FOAM-CMAQ, and SFIRE-CMAQ. Colors show surface ΔO<sub>3</sub> (ppb), and arrows indicate surface wind direction and speed. {sites} Black lines delineate the Fort Benning boundary and the prescribed-fire burn-unit boundary.',
    foot: 'O<sub>3</sub> impacts from prescribed-fire smoke'
  }
};

const defaultSites = 'The blue circle, green triangle, and red diamond mark the trailer, USFS1032, and USFS1033 sites, respectively.';
const april2022Sites = 'The blue circle, yellow downward triangle, pink pentagon, brown upward triangle, cyan diamond, and green diamond mark Main-Trailer, T-1290, T-1292, T-1293, USFS 1078, and USFS 1079, respectively.';
const dateCodes = {
  '20 Mar 2021': '20210320',
  '22 Mar 2021': '20210322',
  '07 Apr 2021': '20210407',
  '20 Apr 2021': '20210420',
  '25 Apr 2022': '20220425'
};
const figurePrefixes = {
  pm: 'pm25_2x2_absolute_',
  o3: 'o3_2x2_absolute_',
  dpm: 'pm25_2x2_delta_',
  do3: 'o3_2x2_delta_'
};
let selectedView = 'pm';
let selectedDate = '07 Apr 2021';

function renderContent() {
  const item = content[selectedView];
  const sites = selectedDate === '25 Apr 2022' ? april2022Sites : defaultSites;
  const species = item.title.replace(/<[^>]*>/g, '');

  document.getElementById('caption').innerHTML = item.caption.replace('{sites}', sites);
  document.getElementById('figure-title').innerHTML = item.title;
  document.getElementById('figure-foot').innerHTML = item.foot;
  document.getElementById('figure-image').src = `assets/${figurePrefixes[selectedView]}${dateCodes[selectedDate]}.gif`;
  document.getElementById('figure-image').alt = `${species} spatial comparison for ${selectedDate}`;
}

document.querySelectorAll('.view').forEach(button => button.addEventListener('click', () => {
  selectedView = button.dataset.view;
  document.querySelectorAll('.view').forEach(item => item.setAttribute('aria-selected', item === button));
  renderContent();
}));

document.querySelectorAll('.date').forEach(button => button.addEventListener('click', () => {
  selectedDate = button.dataset.date;
  document.querySelectorAll('.date').forEach(item => item.setAttribute('aria-selected', item === button));
  document.querySelector('aside h2').textContent = selectedDate;
  document.getElementById('event-date').textContent = selectedDate;
  renderContent();
}));
