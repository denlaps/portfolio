import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const staticSitesPlugin = {
  name: 'static-sites',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const rawUrl = req.url ?? ''
      const [urlPath, query = ''] = rawUrl.split('?')
      if (!urlPath.startsWith('/sites/')) return next()

      const siteMatch = urlPath.match(/^\/sites\/([^/]+)\/?$/)
      const siteName = siteMatch?.[1]
      const indexPath = siteName
        ? path.join(process.cwd(), 'public', 'sites', siteName, 'index.html')
        : null
      const indexExists = indexPath ? fs.existsSync(indexPath) : false

      if (siteMatch && !indexExists) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(`<!DOCTYPE html><html lang="ru"><body><h1>404</h1><p>Демо-сайт «${siteName}» не найден в public/sites.</p></body></html>`)
        return
      }

      if (indexExists) {
        req.url = `/sites/${siteName}/index.html${query ? `?${query}` : ''}`
      }

      next()
    })
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
