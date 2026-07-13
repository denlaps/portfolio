<template>
  <div class="container">
    <section class="contacts-block">
      <h2>Свяжитесь со мной</h2>
      <ul class="contacts-list">
        <li v-for="contact in contacts" :key="contact.type">
          <a
            :href="contact.href"
            class="contacts-link"
            :class="`contacts-link--${contact.type}`"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
          >
            <span class="contacts-link__icon" aria-hidden="true">
              <svg v-if="contact.type === 'phone'" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.85 21 3 13.15 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" fill="currentColor"/>
              </svg>
              <svg v-else-if="contact.type === 'mail'" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" fill="currentColor"/>
              </svg>
              <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.94 4.66a1.25 1.25 0 00-1.28-.18L2.82 11.05a1.1 1.1 0 00.08 2.04l4.9 1.64 1.88 5.74a1.1 1.1 0 001.84.35l2.7-2.7 4.98 3.67a1.1 1.1 0 001.72-.68l3.12-14.5zM8.6 13.52l9.03-5.57-7.2 7.05-.28 2.88-1.55-4.36z" fill="currentColor"/>
              </svg>
            </span>
            <span class="contacts-link__text">{{ contact.label }}</span>
          </a>
        </li>
      </ul>
    </section>
    <section class="map-block">
      <div ref="mapContainer" class="map-container"></div>
    </section>
  </div>
</template>

<script>
import { nextTick } from 'vue'

const MAP_CENTER = [59.906211, 30.317966]
const MAP_ZOOM = 16

let yandexMapsPromise = null
let activeMapState = null
let mapDestroyPromise = Promise.resolve()

function loadYandexMaps() {
  if (window.ymaps) {
    return new Promise((resolve) => window.ymaps.ready(resolve))
  }

  if (yandexMapsPromise) {
    return yandexMapsPromise
  }

  const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY
  if (!apiKey) {
    return Promise.reject(new Error('VITE_YANDEX_MAPS_API_KEY is not set'))
  }

  yandexMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
    script.async = true
    script.onload = () => window.ymaps.ready(resolve)
    script.onerror = () => reject(new Error('Failed to load Yandex Maps API'))
    document.head.appendChild(script)
  })

  return yandexMapsPromise
}

function destroyActiveMapState(state) {
  if (!activeMapState || (state && activeMapState !== state)) {
    return mapDestroyPromise
  }

  const current = activeMapState
  activeMapState = null

  mapDestroyPromise = new Promise((resolve) => {
    const { map, placemark, container } = current

    if (!map) {
      if (container) {
        container.innerHTML = ''
      }
      resolve()
      return
    }

    try {
      if (placemark) {
        map.geoObjects.remove(placemark)
      } else {
        map.geoObjects.removeAll()
      }
    } catch {
      // Map may already be partially destroyed.
    }

    window.setTimeout(() => {
      try {
        map.destroy()
      } catch {
        // Ignore destroy errors from stale map instances.
      }

      if (container) {
        container.innerHTML = ''
      }

      resolve()
    }, 0)
  })

  return mapDestroyPromise
}

export default {
  data() {
    return {
      contacts: [
        {
          type: 'telegram',
          href: 'https://t.me/spiritnostalgie',
          label: '@spiritnostalgie',
          external: true
        },
        {
          type: 'mail',
          href: 'mailto:denlapt@gmail.com',
          label: 'denlapt@gmail.com',
          external: false
        }
      ],
      initToken: 0,
      mapState: null
    }
  },
  mounted() {
    this.initMap()
  },
  beforeUnmount() {
    this.initToken += 1
    destroyActiveMapState(this.mapState)
    this.mapState = null
  },
  methods: {
    isStale(token) {
      return token !== this.initToken
    },

    async initMap() {
      const token = this.initToken + 1
      this.initToken = token

      try {
        await loadYandexMaps()
        await mapDestroyPromise
        await nextTick()

        if (this.isStale(token)) {
          return
        }

        const container = this.$refs.mapContainer
        if (!container) {
          return
        }

        await destroyActiveMapState(this.mapState)
        this.mapState = null

        if (this.isStale(token)) {
          return
        }

        const map = new window.ymaps.Map(container, {
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          controls: ['zoomControl', 'fullscreenControl']
        })

        const placemark = new window.ymaps.Placemark(MAP_CENTER, {}, {
          preset: 'islands#goldDotIcon'
        })

        if (this.isStale(token)) {
          try {
            map.destroy()
          } catch {
            // Ignore cleanup errors for maps created during a stale init.
          }
          return
        }

        map.geoObjects.add(placemark)

        this.mapState = { map, placemark, container }
        activeMapState = this.mapState
      } catch (error) {
        destroyActiveMapState(this.mapState)
        this.mapState = null
        console.error('Failed to initialize Yandex Map:', error)
      }
    }
  }
}
</script>

<style lang="scss">
  .page__contacts {
    main {
      min-height: calc(100vh - #{$headerHeight});

      .container {
        position: relative;
        min-height: inherit;
      }
    }

    .container {
      section {
        &.map-block {
          height: 100%;
          min-height: calc(100vh - #{$headerHeight});
        }

        &.contacts-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 40px;

          h2 {
            font-family: 'Montserrat', sans-serif;
            color: $goldColor;
            font-size: 43px;
            line-height: 1.1;
            margin: 0 0 48px;
          }
        }
      }
    }
  }

  .map-container {
    width: 100%;
    height: 100%;
  }

  .contacts-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .contacts-link {
    display: flex;
    align-items: center;
    gap: 20px;
    text-decoration: none;
    transition: transform $trDelay;

    &:hover {
      transform: translateX(6px);

      .contacts-link__text {
        color: #fff;
      }
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 56px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      transition: background $trDelay, color $trDelay, box-shadow $trDelay;

      svg {
        width: 28px;
        height: 28px;
      }
    }

    &__text {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 32px;
      line-height: 1.2;
      letter-spacing: 0.01em;
      color: rgba(216, 255, 255, 0.88);
      transition: color $trDelay;
    }

    &--phone {
      .contacts-link__icon {
        background: rgba(52, 199, 89, 0.14);
        color: #34C759;
      }

      &:hover .contacts-link__icon {
        background: rgba(52, 199, 89, 0.28);
        box-shadow: 0 0 20px rgba(52, 199, 89, 0.35);
      }
    }

    &--mail {
      .contacts-link__icon {
        background: rgba(234, 67, 53, 0.14);
        color: #EA4335;
      }

      &:hover .contacts-link__icon {
        background: rgba(234, 67, 53, 0.28);
        box-shadow: 0 0 20px rgba(234, 67, 53, 0.35);
      }
    }

    &--telegram {
      .contacts-link__icon {
        background: rgba(42, 171, 238, 0.14);
        color: #2AABEE;
      }

      &:hover .contacts-link__icon {
        background: rgba(42, 171, 238, 0.28);
        box-shadow: 0 0 20px rgba(42, 171, 238, 0.35);
      }
    }
  }

  @media (max-width: 1024px) {
    .contacts-link__text {
      font-size: 28px;
    }
  }

  @media (max-width: 600px) {
    .page__contacts {
      .container {
        section.contacts-block {
          padding: 32px 20px;

          h2 {
            font-size: 32px;
            margin-bottom: 36px;
          }
        }
      }
    }

    .contacts-list {
      gap: 24px;
    }

    .contacts-link {
      gap: 16px;

      &__icon {
        flex: 0 0 48px;
        width: 48px;
        height: 48px;

        svg {
          width: 24px;
          height: 24px;
        }
      }

      &__text {
        font-size: 22px;
      }
    }
  }
</style>
