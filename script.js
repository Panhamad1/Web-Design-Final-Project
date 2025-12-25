// -------- SECTION SWITCHING --------
const buttons = document.querySelectorAll('.nav button');
const sections = document.querySelectorAll('.section');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const target = btn.getAttribute('data-section');
    sections.forEach(sec => {
      sec.style.display = sec.id === target ? 'block' : 'none';
    });
  
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar').classList.remove('active');
    }
  });
});


// -------- AUTO ID GENERATOR --------
function getNextEmployeeId() {
  const rows = document.querySelectorAll('#employeesBody tr');
  let max = 0;

  rows.forEach(row => {
    const num = parseInt(row.cells[0].innerText.replace(/\D/g, ''));
    if (num > max) max = num;
  });

  return 'EMP' + String(max + 1).padStart(3, '0');
}


// -------- CREATE TABLE ROW --------
function createEmployeeRow(emp) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${emp.id}</td>
    <td>${emp.name}</td>
    <td>${emp.department}</td>
    <td>${emp.position}</td>
    <td><span class="badge badge-active">Active</span></td>
    <td>
      <button class="action-btn edit-btn">Edit</button>
      <button class="action-btn delete-btn">Delete</button>
    </td>
  `;
  return tr;
}


// -------- ADD EMPLOYEE --------
function handleAddEmployee(e) {
  e.preventDefault(); //ah nis tok somrab kom page vea reload pel add hz jg teh bat os

  const name = document.getElementById('addName').value.trim();
  const dept = document.getElementById('addDept').value;
  const position = document.getElementById('addPosition').value.trim();
  const message = document.getElementById('addMessage');

  if (!name || !dept || !position) {
    message.innerText = 'Please fill all required fields.';
    message.style.color = 'red';
    return;
  }

  const emp = {
    id: getNextEmployeeId(),
    name,
    department: dept,
    position
  };

  const tbody = document.getElementById('employeesBody');
  tbody.appendChild(createEmployeeRow(emp));

  e.target.reset(); // doysa ta dak preventDefault jg pel send information hz vea ot ban delete jg dak vea oy clear jaol
  document.getElementById('addId').value = getNextEmployeeId();

  message.innerText = 'Employee added successfully.';
  message.style.color = 'green';
}


// -------- LOGOUT --------
document.getElementById('logoutBtn').addEventListener('click', () => {
  window.location.href = "login.html";
});
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('active');
}
