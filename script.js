let patients = [];

function list() {
  return patients;
}

function create(id, name, address, checkup) {
  patients.push({ id, name, address, checkup });
  showList();
}

function detail(id) {
  return patients.find((patient) => patient.id === id);
}

function update(id, name, address, checkup) {
  const patient = detail(id);
  if (patient) {
    patient.name = name;
    patient.address = address;
    patient.checkup = checkup;
    showList();
  }
}

function hideAddForm() {
  patientForm.style.display = 'none';
}

const addNew = document.getElementById("add-new");
const patientForm = document.getElementById("patientModal");
const closeSpan = document.getElementsByClassName("close")[0];

addNew.addEventListener('click', function() {
  patientForm.style.display = "block";
});

closeSpan.addEventListener('click', function() {
  patientForm.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == patientForm) {
    patientForm.style.display = 'none';
  }
});

patientForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const fid = parseInt(document.getElementById('patientid').value);
  const fname = document.getElementById('name').value;
  const faddress = document.getElementById('address').value;
  const fcheckup = document.getElementById('checkup').value;
  
  create(fid, fname, faddress, fcheckup);
  
  // Kosongkan form input setelah submit
  document.getElementById('patientid').value = "";
  document.getElementById('name').value = "";
  document.getElementById('address').value = "";
  document.getElementById('checkup').value = "";

  hideAddForm();
  showList();
});

function showList() {
  const tabel = document.getElementById("tabel-form").getElementsByTagName('tbody')[0];
  tabel.innerHTML = "";
  
  list().forEach(patient => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${patient.id}</td>
    <td>${patient.name}</td>
    <td>${patient.address}</td>
    <td>${patient.checkup}</td>
      <td>
        <button class="editBtn" onclick="editPatient(${patient.id})">Edit</button>
        <button class="deleteBtn" onclick="deletePatient(${patient.id})">Hapus</button>
      </td>
    `;
    tabel.appendChild(row);
  });
}

function editPatient(id) {
  const patient = detail(id);
  if (patient) {
    const newName = prompt("Masukkan nama baru:", patient.name);
    const newAddress = prompt("Masukkan alamat baru:", patient.address);
    const newCheckup = prompt("Masukkan Status checkup baru:", patient.checkup);
    
    if (newName && newAddress && newCheckup) {
      update(id, newName, newAddress, newCheckup);
    }
  }
}

function deletePatient(id) {
  patients = patients.filter((patient) => patient.id !== id);
  showList();
};

