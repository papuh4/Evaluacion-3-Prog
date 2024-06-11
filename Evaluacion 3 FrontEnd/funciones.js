import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0
//addEventListener me permite capturar un evento 
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    //todo apartado de guardar datos con mensajes de tras validaciones.
    if (document.querySelectorAll('.is-invalid').length == 0) {
        let mensaje, titulo;
        if (document.getElementById('btnGuardar').value == 'Guardar'){
            mensaje = "¿Estás seguro de querer guardar el registro?";
            titulo = "Guardado";
            
        } else{
            mensaje = "¿Estás seguro de querer modificar el registro?";
            titulo = "Modificado";
        }
        Swal.fire({
            title: mensaje,
            text: "Verifique que todos sus datos sean correctos",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No.",
            confirmButtonText: "Si"
        }).then((result) => {
            if (result.isConfirmed) {
                const juego = {
                    'unidades': document.getElementById('unidades').value,
                    'nombre': document.getElementById('nombre').value.trim(),
                    'tipo': document.getElementById('tipo').value.trim(),
                    'fechaingreso': document.getElementById('fechaingreso').value,
                    'plataforma': document.getElementById('plataforma').value.trim(),
                    'estado': document.getElementById('estado').value.trim(),
                    'valor': document.getElementById('valor').value
                };

                if (document.getElementById('btnGuardar').value == 'Guardar') {
                    save(juego);
                } else {
                    update(id, juego);
                    id = 0;
                    document.getElementById('btnGuardar').value = 'Guardar';
                }
                limpiar();
                    Swal.fire({
                        title: titulo,
                        text: `El registro se ha ${titulo}`,
                        icon: "success"
                    });
            }
        });
    }
});


//DOMEventLister es un evento que se ejecuta cuando se recarga la página 
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.unidades}</td>
            <td>${item.nombre}</td>
            <td>${item.tipo}</td>
            <td>${item.fechaingreso}</td>
            <td>${item.plataforma}</td>
            <td>${item.estado}</td>
            <td>${item.valor}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botón y eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //añadir sweetalert para confirmar la eliminación
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        //seleccionar el documento
        document.querySelectorAll('.btn-warning').forEach( btn => {
            //async indica que necesitamos un await para esperar a que la función responda
            btn.addEventListener('click',async() =>{
                //invocar función para buscar el documento por su id
                const doc = await obtener(btn.id)
                //obtener los valores del documento
                const d = doc.data()
                //asignar los valores a los input
                document.getElementById('unidades').value = d.unidades
                document.getElementById('nombre').value = d.nombre
                document.getElementById('tipo').value = d.tipo
                document.getElementById('fechaingreso').value = d.fechaingreso
                document.getElementById('plataforma').value = d.plataforma
                document.getElementById('estado').value = d.estado
                document.getElementById('valor').value = d.valor
                //modificar el valor del botón 
                document.getElementById('btnGuardar').value = 'Modificar'
                //asignar el id del documento a nuestra variable
                id = btn.id
            })
        })

    })
})