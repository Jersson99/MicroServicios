function CambiarEstadoTarea(taskId, newStatus) {
    fetch(`/tareas/${idEmpleado}/estado`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        body: JSON.stringify({ status: newStatus })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Estado cambiado con éxito');
                location.reload();
            } else {
                alert('Error al cambiar de estado');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
