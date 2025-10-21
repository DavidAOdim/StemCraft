// --- 1. Data Mockup ---
const BIN_DATA = {
    'bin-101': {
        name: 'PGH Foyer - Bin #101',
        weight: '45.2 kg',
        rank: '#4 of 120',
        emptied: '2 hours ago'
    },
    'bin-102': {
        name: 'MD Anderson Library - 3rd Floor - Bin #102',
        weight: '98.1 kg',
        rank: '#1 of 120',
        emptied: '10 minutes ago'
    },
    // Default data when no bin is selected
    'default': {
        name: 'Click a marker on the map for stats.',
        weight: '--',
        rank: '--',
        emptied: '--'
    }
};

const BENCHMARK_DATA = [
    { university: 'Texas A&M', rate: '35%', tons: '650' },
    { university: 'UT Austin', rate: '22%', tons: '420' },
    { university: 'Rice University', rate: '40%', tons: '210' },
    { university: 'Texas Tech', rate: '18%', tons: '300' },
    { university: 'University of Houston', rate: '28%', tons: '450' } // UH Dummy Data
];

// --- 2. Core Functions ---

// Function to update the bin stats panel
function updateBinStats(binId) {
    const data = BIN_DATA[binId] || BIN_DATA['default'];
    
    document.getElementById('bin-location-name').textContent = data.name;
    document.getElementById('bin-weight').textContent = data.weight;
    document.getElementById('bin-rank').textContent = data.rank;
    document.getElementById('bin-emptied').textContent = data.emptied;

    // In a real application, you'd also update the 3D model view here 
    // to show a larger view of the selected bin.
    if (binId !== 'default') {
        console.log(`Displaying larger view for bin: ${data.name}`);
    }
}

// Function to populate the benchmark table
function populateBenchmarkTable() {
    const tableBody = document.getElementById('benchmark-table-body');
    tableBody.innerHTML = ''; // Clear previous data

    BENCHMARK_DATA.forEach(data => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = data.university;
        row.insertCell().textContent = data.rate;
        row.insertCell().textContent = data.tons;
        
        // Highlight UH data
        if (data.university === 'University of Houston') {
            row.style.fontWeight = 'bold';
            row.style.backgroundColor = 'var(--light-grey)';
        }
    });
}

// Function to handle tab switching
function switchTab(targetTab) {
    // Hide all content tabs
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });

    // Deactivate all nav buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show the target tab and activate the button
    document.getElementById(targetTab).style.display = 'block';
    document.getElementById(targetTab).classList.add('active');
    document.querySelector(`.nav-tab[data-tab="${targetTab}"]`).classList.add('active');

    // Run specific initialization logic for the tab
    if (targetTab === 'other-universities') {
        populateBenchmarkTable();
    }
    if (targetTab === 'uh-tracker') {
        updateBinStats('default'); // Reset stats view when returning to UH tab
    }
}

// --- 3. Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Default View
    updateBinStats('default'); 

    // 2. Setup Nav Tab Listeners
    document.querySelectorAll('.nav-tab').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-tab');
            switchTab(target);
        });
    });

    // 3. Setup Map Marker Click Listeners (Simulation)
    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.addEventListener('click', (e) => {
            const binId = e.target.getAttribute('data-bin-id');
            updateBinStats(binId);
        });
    });

    // 4. 3D Model Click/Open Simulation
    document.getElementById('3d-model-placeholder').addEventListener('click', () => {
        alert("3D Model Action: The recycling bin opens! (In a real site, Three.js would animate this)");
    });
});