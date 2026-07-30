# Deploy en Render (Opcion 2)

## 1) Subir proyecto a GitHub

En la carpeta del proyecto, ejecuta:

```bash
git init
git add .
git commit -m "Sitio listo para deploy"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## 2) Crear el servicio en Render

1. Ve a https://render.com
2. Inicia sesion y presiona **New +**
3. Elige **Blueprint** (recomendado, usa `render.yaml` automaticamente)
4. Conecta tu repositorio
5. Confirma el deploy

Render tomara automaticamente:
- build: `npm install`
- start: `npm start`
- Node: 20

## 3) Compartir el link con tu cliente

Cuando termine el deploy, Render te dara una URL como:

`https://magenta-web.onrender.com`

Ese link ya abre desde celular y computadora.

## Notas importantes

- La primera carga en plan free puede tardar unos segundos.
- Tu formulario guarda datos en `data/contacts.json`.
- En Render free, esos datos pueden perderse si el servicio se reinicia (filesystem temporal).
- Para produccion final, conviene conectar base de datos (Supabase, PostgreSQL, etc.).

## 4) Actualizar cambios

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Actualizacion"
git push
```

Render vuelve a desplegar automaticamente.
