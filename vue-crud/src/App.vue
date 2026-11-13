<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3001/tareas'
const tareas = ref([])
const nuevaTarea = ref({ titulo: '', descripcion: '', completada: false })
const editandoId = ref(null)

// 1. READ (Leer)
const obtenerTareas = async () => {
  const respuesta = await axios.get(API_URL)
  tareas.value = respuesta.data
}

// 2. CREATE (Crear)
const crearTarea = async () => {
  if (nuevaTarea.value.titulo === '') return alert('El título es obligatorio')
  await axios.post(API_URL, nuevaTarea.value)
  nuevaTarea.value = { titulo: '', descripcion: '', completada: false }
  obtenerTareas()
}

// 3. DELETE (Eliminar)
const eliminarTarea = async (id) => {
  if (confirm('¿Seguro que quieres eliminar esta tarea?')) {
    await axios.delete(`${API_URL}/${id}`)
    obtenerTareas()
  }
}

// 4. UPDATE (Actualizar/Editar)
const prepararEdicion = (tarea) => {
  editandoId.value = tarea.id
  nuevaTarea.value = { ...tarea }
}

const guardarEdicion = async () => {
  await axios.put(`${API_URL}/${editandoId.value}`, nuevaTarea.value)
  editandoId.value = null
  nuevaTarea.value = { titulo: '', descripcion: '', completada: false }
  obtenerTareas()
}

onMounted(() => {
  obtenerTareas()
})
</script>

<template>
  <div class="contenedor">
    <h1>CRUD de Tareas - Vue</h1>

    <!-- Formulario -->
    <div class="formulario">
      <h2>{{ editandoId ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
      <input v-model="nuevaTarea.titulo" placeholder="Título de la tarea" />
      <input v-model="nuevaTarea.descripcion" placeholder="Descripción" />
      
      <button v-if="editandoId" @click="guardarEdicion" class="btn-guardar">Guardar Cambios</button>
      <button v-else @click="crearTarea" class="btn-crear">Crear Tarea</button>
    </div>

    <!-- Lista -->
    <ul class="lista">
      <li v-for="tarea in tareas" :key="tarea.id">
        <div>
          <strong>{{ tarea.titulo }}</strong> - {{ tarea.descripcion }}
        </div>
        <div>
          <button @click="prepararEdicion(tarea)" class="btn-editar">Editar</button>
          <button @click="eliminarTarea(tarea.id)" class="btn-eliminar">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.contenedor { max-width: 600px; margin: 0 auto; font-family: sans-serif; padding: 20px; }
.formulario { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; background: #f4f4f4; padding: 15px; border-radius: 8px;}
input { padding: 8px; font-size: 16px; }
button { padding: 8px 12px; cursor: pointer; border: none; border-radius: 4px; color: white;}
.btn-crear { background: green; }
.btn-guardar { background: blue; }
.btn-editar { background: orange; margin-right: 5px; }
.btn-eliminar { background: red; }
.lista { list-style: none; padding: 0; }
.lista li { display: flex; justify-content: space-between; align-items: center; background: #eee; padding: 10px; margin-bottom: 8px; border-radius: 4px;}
</style>