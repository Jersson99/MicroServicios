document.addEventListener('DOMContentLoaded', function() {
    const tareaForm = document.getElementById('tareaForm');
    const tareasContainer = document.getElementById('tareasContainer');
    const errorElement = document.getElementById('error');

    tareaForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(tareaForm);

        try {
            const response = await fetch('/api/tareas', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al guardar la tarea');
            }

            const tarea = await response.json();
            renderTarea(tarea);
            tareaForm.reset();
            errorElement.textContent = '';
        } catch (error) {
            errorElement.textContent = error.message;
        }
    });

    async function cargarTareas() {
        try {
            const response = await fetch('/api/tareas');
            if (!response.ok) {
                throw new Error('Error al cargar las tareas');
            }

            const tareas = await response.json();
            tareasContainer.innerHTML = '';
            tareas.forEach(renderTarea);
        } catch (error) {
            errorElement.textContent = error.message;
        }
    }

    function renderTarea(tarea) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');

        tareaDiv.innerHTML = `
            <h3>${tarea.titulo}</h3>
            <p>${tarea.descripcion}</p>
            <p>Fecha Estimada de Finalización: ${tarea.fechaEstimadaFinalizacion}</p>
            <p>Estado: ${tarea.estado.nombre}</p>
            <p>Prioridad: ${tarea.prioridad.nombre}</p>
            <div class="acciones">
                <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
                <button onclick="editarTarea(${tarea.id})">Editar</button>
            </div>
        `;

        tareasContainer.appendChild(tareaDiv);
    }

    async function eliminarTarea(id) {
        try {
            const response = await fetch(`/api/tareas/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }

            await cargarTareas();
        } catch (error) {
            errorElement.textContent = error.message;
        }
    }

    cargarTareas();
});
