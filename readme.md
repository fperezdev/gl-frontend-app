# Frontend App Grupo Lagos

Aplicación de frontend para el desafío técnico de Grupo Lagos hecho por Francisco Perez.
</br>
Se conecta a la API de Itunes para obtener canciones de algún artista y también permite guardar favoritos.

## Tabla de contenidos

- [Frontend App Grupo Lagos](#frontend-app-grupo-lagos)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Stack Tecnológico](#stack-tecnológico)
  - [Instalación](#instalación)
    - [Levantar localmente](#como-levantar-la-aplicación-localmente)
  - [Consideraciones](#consideraciones)
  - [Contribuyentes](#contribuyentes)

---

## Stack Tecnológico

- Node.js LTS 22.11.0
- React 18 con TypeScript
- Zustand
- Material UI

---

## Instalación

Cabe mencionar que la aplicación se deployó en internet y se puede ingresar desde https://gl.fperezdev.com/
</br>
Si aún se necesita levantar localmente se deben seguir los pasos descritos a continuación.

### Como levantar la aplicación localmente

Los siguientes pasos aplican tanto para Windows, Mac o Linux.

1. Clonar el repositorio con `git clone https://github.com/fperezdev/gl-app.git`
2. Correr el comando `npm i` si se clonó por primera vez el proyecto. Esto estando en la carpeta raíz que contiene el `package.json`.
3. Crear un archivo .env en la carpeta raíz que contenga el valor `VITE_API_BASE_URL`, que sea la url para conectar a la API, ejemplo `VITE_API_BASE_URL=http://localhost:3001`. También se puede apuntar directamente a https://gl-api-production.up.railway.app si no se quiere levantar la API también.
3. Ejecutar el comando `npm run dev` para correr localmente la aplicación.

## Consideraciones

Esta aplición cuenta con lo mínimo para cumplir los requerimientos del desafío, temas importantes como la seguridad se han dejado de lado para priorizar las funcionalidades.

## Menciones

Para hacer el deploy de la aplicación en Railway fue necesario clonar un repositorio template desde https://github.com/brody192/vite-react-template

---

## Contribuyentes

- Francisco Perez Lefiman
