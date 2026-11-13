# Protocolo ABP - Comparación CRUD (Angular, Vue y React)

Este repositorio contiene la implementación de un CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de "Tareas", desarrollado en los tres frameworks más populares.

## 🚀 Cómo ejecutar el proyecto

Para probar cualquiera de los tres proyectos, primero debes encender el servidor de base de datos simulado (json-server) que alimenta a los tres frontends.

### 1. Encender la Base de Datos (Obligatorio)
Abre una terminal en la raíz de este proyecto y ejecuta:
```bash
npx json-server --watch db.json --port 3001
