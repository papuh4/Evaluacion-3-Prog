const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    //verificar campos sin rellenar, montos de juegos menores a 1000 no aceptados y stock mayor a 0.
    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id === 'valor') {
            if (input.value < 1000) {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">No se puede ingresar dicho monto</span>';
            }
        } else if (id === 'unidades') {
            if (input.value <= 0) {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La cantidad debe ser mayor a 0</span>';
            }
        }
    }
};

//limpiar
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
    })
}
//solo se ingresaran numeros
const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
//me valida la fecha
const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}

