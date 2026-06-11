# Las Chismosas

Pagina web de Las Chismosas — banda de ska / punk / reggae del under argentino.

## Stack

- **NestJS** + **TypeScript** en el backend
- **Handlebars** para renderizar la home
- Assets estaticos servidos desde `public/`

## Estructura

```
src/
  main.ts                  # bootstrap Nest + view engine
  app.module.ts
  app.controller.ts        # GET /  -> renderiza views/index.hbs con shows y banda
  shows/                   # /api/shows
  band/                    # /api/band
  newsletter/              # POST /api/newsletter/subscribe
views/
  index.hbs                # diseno pixel-perfect (hero, marquesina, shows, musica, banda, contacto)
public/
  image-slot.js            # custom element para slots de imagen (del diseno original)
  newsletter.js            # wire-up del formulario de newsletter
```

## Como correr

```bash
npm install
npm run start:dev   # http://localhost:3000
```

## Endpoints

- `GET /` — sitio renderizado
- `GET /api/shows` — proximas fechas
- `GET /api/band` — integrantes
- `POST /api/newsletter/subscribe` — `{ email: string }`
