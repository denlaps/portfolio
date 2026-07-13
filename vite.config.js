import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

function createSitesMiddleware(sitesRoot) {
  return (req, res, next) => {
    const rawUrl = req.url ?? ''
    const [urlPath, query = ''] = rawUrl.split('?')

    if (!urlPath.startsWith('/sites/')) {
      return next()
    }

    const relative = decodeURIComponent(urlPath.slice('/sites/'.length)).replace(/^\/+/, '')
    const querySuffix = query ? `?${query}` : ''

    if (!relative) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end('<!DOCTYPE html><html lang="ru"><body><h1>404</h1></body></html>')
      return
    }

    const segments = relative.split('/').filter(Boolean)
    if (segments.some((segment) => segment === '..' || segment === '.')) {
      res.statusCode = 400
      res.end('Bad request')
      return
    }

    const directPath = path.join(sitesRoot, ...segments)

    if (fs.existsSync(directPath)) {
      if (fs.statSync(directPath).isFile()) {
        return next()
      }

      const indexPath = path.join(directPath, 'index.html')
      if (fs.existsSync(indexPath)) {
        req.url = `/sites/${segments.join('/')}/index.html${querySuffix}`
        return next()
      }
    }

    const candidates = [
      directPath,
      `${directPath}.html`,
      path.join(directPath, 'index.html')
    ]

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        const rel = path.relative(sitesRoot, candidate).split(path.sep).join('/')
        req.url = `/sites/${rel}${querySuffix}`
        return next()
      }
    }

    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(`<!DOCTYPE html><html lang="ru"><body><h1>404</h1><p>Не найдено: /sites/${relative}</p></body></html>`)
  }
}

const staticSitesPlugin = {
  name: 'static-sites',
  configureServer(server) {
    const sitesRoot = path.join(process.cwd(), 'public', 'sites')
    server.middlewares.use(createSitesMiddleware(sitesRoot))
  },
  configurePreviewServer(server) {
    const sitesRoot = path.join(process.cwd(), 'dist', 'sites')
    server.middlewares.use(createSitesMiddleware(sitesRoot))
  }
}

export default defineConfig({
  plugins: [vue(), staticSitesPlugin],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_includes.scss";`
      }
    }
  },
  build: {
    sourcemap: true
  }
})
