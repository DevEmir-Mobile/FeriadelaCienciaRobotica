const form = document.getElementById('form');
const rankingBody = document.getElementById('rankingBody');
let data = [];

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const series = parseInt(document.getElementById('series').value);
  const reps = parseInt(document.getElementById('reps').value);

  if (!name || isNaN(series) || isNaN(reps) || series < 1 || reps < 1) {
    alert('Por favor, ingrese un nombre y valores positivos válidos.');
    return;
  }

  const points = series * reps * 10;
  data.push({ name, series, reps, points });
  data.sort((a, b) => b.points - a.points);

  updateTable();
  form.reset();
});

function updateTable() {
  rankingBody.innerHTML = '';
  data.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.series}</td>
      <td>${item.reps}</td>
      <td>${item.points}</td>
    `;

    rankingBody.appendChild(row);
  });
} 
