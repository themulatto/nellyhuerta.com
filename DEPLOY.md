# 🚀 Deploy — new.nellyhuerta.com
## Solo GitHub Pages + GoDaddy · Sin Netlify

---

## PASO 1 — Subir el sitio al repo

El repo ya existe en: https://github.com/themulatto/nellyhuerta.com

Desde la carpeta `nelly-site/` en tu computador:

```bash
git init
git add .
git commit -m "🌸 Sitio Nelly Huerta — versión inicial"
git branch -M main
git remote add origin https://github.com/themulatto/nellyhuerta.com.git
git push -u origin main
```

La estructura que debe quedar en GitHub:
```
nellyhuerta.com/  ← raíz del repo
├── index.html
├── CNAME         ← lo creas en el Paso 3
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── RETRATO_EXPRESS_NELLY_EN26-*.jpg
└── audio/
    └── tramayDesenlace.mp3
```

---

## PASO 2 — Activar GitHub Pages

1. Ir a https://github.com/themulatto/nellyhuerta.com
2. Clic en **Settings** (pestaña arriba a la derecha)
3. Menú izquierdo → **Pages**
4. En "Branch": seleccionar **main** y carpeta **/ (root)**
5. Clic en **Save**

GitHub te mostrará: `https://themulatto.github.io/nellyhuerta.com/`
Ese es el sitio funcionando. Ahora hay que apuntarle el dominio.

---

## PASO 3 — Crear el archivo CNAME en el repo

GitHub Pages necesita un archivo llamado `CNAME` (sin extensión)
en la **raíz del repo** con el subdominio adentro.

Desde la terminal, dentro de la carpeta del proyecto:

```bash
echo "new.nellyhuerta.com" > CNAME
git add CNAME
git commit -m "Agregar dominio personalizado"
git push
```

O crearlo directo desde GitHub web:
New file → nombre: `CNAME` → contenido: `new.nellyhuerta.com` → Commit

---

## PASO 4 — Configurar GoDaddy (registro CNAME)

1. Entrar a **godaddy.com** → Mis productos
2. Al lado de `nellyhuerta.com` → clic en **DNS**
3. Clic en **Agregar registro**
4. Completar así:

   | Campo      | Valor                  |
   |------------|------------------------|
   | Tipo       | `CNAME`                |
   | Nombre     | `new`                  |
   | Valor      | `themulatto.github.io` |
   | TTL        | 1 hora                 |

5. Guardar → esperar 5–30 minutos para que propague el DNS

> 💡 El valor CNAME es siempre `themulatto.github.io` (sin la ruta del repo).
> GitHub lee el archivo `CNAME` del repo para saber a qué sitio dirigir.

---

## PASO 5 — Activar HTTPS en GitHub Pages

Una vez que GoDaddy propagó el DNS:

1. Volver a **GitHub → Settings → Pages**
2. Verás "Your site is live at https://new.nellyhuerta.com"
3. Marcar la casilla **"Enforce HTTPS"**
4. ✅ Listo — HTTPS gratuito automático (Let's Encrypt)

---

## Checklist final

- [ ] `https://new.nellyhuerta.com` carga el sitio
- [ ] Las imágenes cargan (carpeta `images/`)
- [ ] El audio funciona al primer click (`audio/tramayDesenlace.mp3`)
- [ ] El botón ❤️ suma y persiste al recargar
- [ ] Hover del badge Encuadrado muestra el tooltip
- [ ] "Agendar hora" abre `encuadrado.com/p/nelly-huerta`
- [ ] Se ve bien en móvil

---

## Actualizar el sitio (próximas veces)

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Pages redespliega en ~30 segundos automáticamente.

---

*Generado para nellyhuerta.com · Marzo 2026*
