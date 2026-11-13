import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  API_URL = 'http://localhost:3001/tareas';
  tareas: any[] = [];
  nuevaTarea = { titulo: '', descripcion: '', completada: false };
  editandoId: number | null = null;

  ngOnInit() {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    const res = await axios.get(this.API_URL);
    this.tareas = res.data;
  }

  async crearTarea() {
    if (this.nuevaTarea.titulo === '') return alert('El título es obligatorio');
    await axios.post(this.API_URL, this.nuevaTarea);
    this.nuevaTarea = { titulo: '', descripcion: '', completada: false };
    this.obtenerTareas();
  }

  async eliminarTarea(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta tarea?')) {
      await axios.delete(`${this.API_URL}/${id}`);
      this.obtenerTareas();
    }
  }

  prepararEdicion(tarea: any) {
    this.editandoId = tarea.id;
    this.nuevaTarea = { ...tarea };
  }

  async guardarEdicion() {
    await axios.put(`${this.API_URL}/${this.editandoId}`, this.nuevaTarea);
    this.editandoId = null;
    this.nuevaTarea = { titulo: '', descripcion: '', completada: false };
    this.obtenerTareas();
  }
}