import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const SITE_ROOT_RE = /^\/sites\/([^/]+)(?:\/?|\/index)$/

function resolveSiteIndex(siteName, rootDir) {
  return path.join(rootDir, 'sites', siteName, 'index.html')
}

const staticSitesPlugin = {
  name: 'static-sites',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const rawUrl = req.url ?? ''
      const [urlPath, query = ''] = rawUrl.split('?')
      if (!urlPath.startsWith('/sites/')) return next()

      const siteMatch = urlPath.match(SITE_ROOT_RE)
      if (!siteMatch) return next()

      const siteName = siteMatch[1]
      const indexPath = resolveSiteIndex(siteName, path.join(process.cwd(), 'public'))
      const indexExists = fs.existsSync(indexPath)

      if (!indexExists) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(`<!DOCTYPE html><html lang="ru"><body><h1>404</h1><p>Демо-сайт «${siteName}» не найден в public/sites.</p></body></html>`)
        return
      }

      req.url = `/sites/${siteName}/index.html${query ? `?${query}` : ''}`
      next()
    })
  },
  closeBundle() {
    const sitesDir = path.join(process.cwd(), 'dist', 'sites')
    if (!fs.existsSync(sitesDir)) return

    for (const siteName of fs.readdirSync(sitesDir)) {
      const siteDir = path.join(sitesDir, siteName)
      if (!fs.statSync(siteDir).isDirectory()) continue

      const indexHtml = path.join(siteDir, 'index.html')
      if (!fs.existsSync(indexHtml)) continue

      fs.copyFileSync(indexHtml, path.join(siteDir, 'index'))
    }
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
