# Valymo Ekspertai

`Next.js` projektas su SEO baze ir paprasta administravimo panele.

## Paleidimas

1. Nukopijuokite `.env.example` i `.env`
2. Nustatykite `ADMIN_PASSWORD`
3. Nustatykite `NEXT_PUBLIC_SITE_URL`
4. Paleiskite:

```bash
npm install
npm run dev
```

## Administravimas

- Admin adresas: `/admin`
- Prisijungimas vyksta per `ADMIN_PASSWORD`
- Turinys saugomas faile `src/content/site-content.json`

## Ką galima redaguoti

- SEO title, description, keywords
- Hero tekstus
- Paslaugas
- Kainas
- DUK
- Kontaktinę informaciją

## SEO

- `metadata` per `app` router
- `robots.txt`
- `sitemap.xml`
- `LocalBusiness` schema
