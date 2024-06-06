//const localhost = 'http://localhost:3000';
const localhost= 'https://apitopicos-97y4.onrender.com';

async function fetchUsers() {
    try {
        const response = await fetch(localhost);
        const users = await response.json();
        const usersDiv = document.getElementById('users');
        usersDiv.innerHTML = ''; // Limpiar el contenido anterior

        users.forEach(registros => {
            const userDiv = document.createElement('div');
            userDiv.className = 'registros';
            userDiv.innerHTML = `
                <span id="registros-${registros.id}">${registros.id}: ${registros.nombre}</span>
                <button onclick="deleteUser(${registros.id})">Eliminar</button>
                <button onclick="showEditUser(${registros.id}, '${registros.nombre}')">Editar</button>
            `;
            usersDiv.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

async function addUser() {
    const nombre = document.getElementById('nombre').value;
    if (!nombre) return alert('Por favor ingrese un nombre');
    try {
        const response = await fetch(localhost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });
        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario agregado con éxito",
                showConfirmButton: false,
                timer: 1500
            });
            fetchUsers();
            document.getElementById('nombre').value = ''; // Limpiar el campo de entrada
        } else {
            console.error('Error al agregar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(localhost, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            fetchUsers();
        } else {
            console.error('Error al eliminar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}

function showEditUser(id, currentName) {
    const newName = prompt('Ingrese el nuevo nombre:', currentName);
    if (newName && newName !== currentName) {
        editUser(id, newName);
    }
}

async function editUser(id, nombre) {
    try {
        const response = await fetch(localhost, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nombre })
        });
        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario editado con éxito",
                showConfirmButton: false,
                timer: 1500
            });
            fetchUsers();
        } else {
            console.error('Error al editar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al editar el usuario:', error);
    }
}

// Inicializar la lista de usuarios al cargar la página
fetchUsers();