const form = document.getElementById('form');
const rankingBody = document.getElementById('rankingBody');
let data = [];

// Función para obtener la clase CSS del rank
function getRankClass(rank) {
  if (rank === 1) return 'rank-1';
  if (rank === 2) return 'rank-2';
  if (rank === 3) return 'rank-3';
  return 'rank-other';
}

// Función para formatear la fecha sin desfase
function formatDate(dateString) {
  // dateString viene en formato 'YYYY-MM-DD'
  const [year, month, day] = dateString.split('-');
  // Crear una fecha local sin desfase
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${parseInt(day)} de ${meses[parseInt(month) - 1]} de ${year}`;
}

// Función para mostrar estado vacío
function showEmptyState() {
  rankingBody.innerHTML = `
    <tr>
      <td colspan="7">
        <div class="empty-state">
          <div class="empty-state-icon">🏆</div>
          <p>No hay participantes aún.<br>¡Sé el primero en agregar tu puntuación!</p>
        </div>
      </td>
    </tr>
  `;
}

// Función para actualizar la tabla
function updateTable() {
  if (data.length === 0) {
    showEmptyState();
    return;
  }

  rankingBody.innerHTML = '';
  data.forEach((item, index) => {
    const rank = index + 1;
    const rankClass = getRankClass(rank);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><span class="rank-badge ${rankClass}">${rank}</span></td>
      <td><strong>${item.name}</strong></td>
      <td>${item.exerciseType}</td>
      <td>${formatDate(item.date)}</td>
      <td>${item.series}</td>
      <td>${item.reps}</td>
      <td><span class="points-badge">${item.points}</span></td>
    `;
    rankingBody.appendChild(row);
  });
}

// Función para mostrar feedback visual en el botón
function showButtonFeedback(success = true) {
  const button = document.querySelector('.submit-btn');
  const originalText = button.textContent;
  
  if (success) {
    button.textContent = '¡Agregado correctamente!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  } else {
    button.textContent = '¡Error en los datos!';
    button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
  }
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%)';
    button.style.backgroundSize = '200% 200%';
  }, 2000);
}

// Event listener para el formulario
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const exerciseType = document.getElementById('exerciseType').value;
  const date = document.getElementById('date').value;
  const series = parseInt(document.getElementById('series').value);
  const reps = parseInt(document.getElementById('reps').value);

  // Validación mejorada
  if (!name || !exerciseType || !date || isNaN(series) || isNaN(reps) || series < 1 || reps < 1) {
    alert('Por favor, complete todos los campos con valores válidos.');
    showButtonFeedback(false);
    return;
  }

  // Cálculo de puntos
  const points = series * reps * 10;
  
  // Agregar los datos al array
  data.push({ name, exerciseType, date, series, reps, points });
  
  // Ordenar por puntos (mayor a menor)
  data.sort((a, b) => b.points - a.points);

  // Actualizar la tabla
  updateTable();
  
  // Mostrar feedback
  showButtonFeedback(true);
  
  // Limpiar el formulario
  form.reset();
});

// Inicializar la tabla con estado vacío
showEmptyState();