<template>
  <div class="container">
    <section class="about__timeline">
      <ol class="timeline">
        <li
          v-for="(item, index) in timelineItems"
          :key="item.originalIndex"
          class="timeline__item"
          :class="{
            'timeline__item--current': item.originalIndex === about.timeline.length - 1,
            'timeline__item--active': hoveredIndex === index
          }"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <span class="timeline__year">{{ item.year }}</span>
          <button
            type="button"
            class="timeline__dot"
            :aria-label="item.title"
            @focus="hoveredIndex = index"
            @blur="hoveredIndex = null"
          />
          <div class="timeline__card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </section>
    <section class="about__photo">
      <img :src="getSrc('/photos/photo1.jpg')" alt="">
      <div class="nextButton">
        <router-link
          to="/contacts"
          custom
          v-slot="{ navigate }"
        >
          <button type="button" @click="navigate">Напишите мне</button>
        </router-link>
        <i class="arrow">
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.7071 8.70711C40.0976 8.31659 40.0976 7.68342 39.7071 7.2929L33.3431 0.928935C32.9526 0.538411 32.3195 0.538411 31.9289 0.928935C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM-8.74228e-08 9L39 9L39 7L8.74228e-08 7L-8.74228e-08 9Z" fill="currentColor"/>
          </svg>
        </i>
      </div>
    </section>
  </div>
</template>

<script>
import { publicPath } from '../utils/publicPath.js'

export default {
  data() {
    return {
      about: {
        timeline: []
      },
      hoveredIndex: null
    }
  },

  mounted() {
    this.getData('about')
  },

  computed: {
    timelineItems() {
      return this.about.timeline
        .map((item, originalIndex) => ({ ...item, originalIndex }))
        .reverse()
    }
  },

  methods: {
    getSrc(url) {
      return publicPath(url)
    },

    getData(type) {
      fetch(publicPath(`data/${type}.data.json`))
        .then((data) => data.json())
        .then((data) => {
          this[type] = data
        })
    }
  }
}
</script>

<style lang="scss">
  .page__about {
    main {
      align-items: center;
      justify-content: center;

      .container {
        width: 100%;
        max-width: 1000px;
        flex-direction: row;
        align-items: flex-start;
        gap: 40px;
        padding: 40px;

        section {
          &.about__timeline {
            flex: 1;
            min-width: 0;
            width: auto;
          }

          &.about__photo {
            flex: 0 0 300px;
            width: 300px;
            max-width: 300px;
            align-self: center;

            img {
              width: 100%;
            }

            .nextButton {
              button {
                background: #FEBB36;
                color: #1C3A3C;

                &:hover {
                  background: #fff;
                }
              }

              .arrow {
                color: #FEBB36;
              }
            }
          }
        }
      }
    }
  }

  .timeline {
    --timeline-date-width: 120px;
    --timeline-dot-width: 20px;
    --timeline-gap: 20px;
    --timeline-axis: calc(var(--timeline-date-width) + var(--timeline-gap) + var(--timeline-dot-width) / 2);
    --timeline-connector-width: calc(var(--timeline-gap) + var(--timeline-dot-width) / 2);

    list-style: none;
    margin: 0;
    padding: 20px 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: var(--timeline-axis);
      top: 0;
      bottom: 0;
      width: 2px;
      transform: translateX(-50%);
      background: linear-gradient(
        to bottom,
        transparent,
        rgba(254, 187, 54, 0.5) 10%,
        rgba(254, 187, 54, 0.5) 90%,
        transparent
      );
    }

    &__item {
      display: grid;
      grid-template-columns: var(--timeline-date-width) var(--timeline-dot-width) 1fr;
      align-items: center;
      gap: 0 var(--timeline-gap);
      margin-bottom: 40px;
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }

      &--active .timeline__year {
        color: $lightBlue;
        text-shadow: 0 0 20px rgba(254, 187, 54, 0.4);
      }

      &--active::after {
        background: rgba(254, 187, 54, 0.75);
      }

      &--active .timeline__card {
        border-color: rgba(254, 187, 54, 0.45);
        background: rgba(52, 80, 96, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      &--active .timeline__dot {
        width: 18px;
        height: 18px;
        box-shadow: 0 0 16px rgba(254, 187, 54, 0.9);
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: var(--timeline-axis);
        width: var(--timeline-connector-width);
        height: 2px;
        background: rgba(254, 187, 54, 0.35);
        transform: translateY(-50%);
        transition: background $trDelay;
        pointer-events: none;
        z-index: 1;
      }
    }

    &__year {
      grid-column: 1;
      grid-row: 1;
      justify-self: end;
      text-align: right;
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      font-size: 24px;
      line-height: 1.15;
      color: $goldColor;
      letter-spacing: 0.03em;
      padding-right: 4px;
      transition: color $trDelay, text-shadow $trDelay;
    }

    &__dot {
      grid-column: 2;
      grid-row: 1;
      justify-self: center;
      align-self: center;
      width: 14px;
      height: 14px;
      padding: 0;
      border: 2px solid #28404D;
      border-radius: 50%;
      background: $goldColor;
      cursor: pointer;
      z-index: 2;
      transition: width 0.25s ease, height 0.25s ease, box-shadow 0.25s ease;
      box-shadow: 0 0 8px rgba(254, 187, 54, 0.5);

      &:hover,
      &:focus {
        outline: none;
        width: 18px;
        height: 18px;
        box-shadow: 0 0 16px rgba(254, 187, 54, 0.9);
      }
    }

    &__card {
      grid-column: 3;
      grid-row: 1;
      position: relative;
      text-align: left;
      max-width: none;
      padding: 18px 22px;
      background: rgba(52, 80, 96, 0.28);
      border: 1px solid rgba(254, 187, 54, 0.18);
      border-radius: 8px;
      transition: transform $trDelay, border-color $trDelay, background $trDelay, box-shadow $trDelay;
      z-index: 1;

      h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        font-size: 22px;
        line-height: 1.35;
        color: $goldColor;
        margin: 0 0 10px;
      }

      p {
        font-family: 'Roboto Light', sans-serif;
        font-weight: normal;
        font-size: 18px;
        line-height: 1.5;
        color: rgba(216, 255, 255, 0.85);
        margin: 0;
      }
    }

    &__item--current {
      .timeline__year {
        font-weight: 600;
      }

      .timeline__dot {
        width: 18px;
        height: 18px;
        animation: timelinePulse 2s ease-in-out infinite;
      }
    }
  }

  @keyframes timelinePulse {
    0%, 100% {
      box-shadow: 0 0 8px rgba(254, 187, 54, 0.5), 0 0 0 0 rgba(254, 187, 54, 0.4);
    }
    50% {
      box-shadow: 0 0 16px rgba(254, 187, 54, 0.8), 0 0 0 8px rgba(254, 187, 54, 0);
    }
  }

  @media (max-width: 1200px) {
    .page__about {
      main {
        .container {
          gap: 32px;
          padding: 32px 24px;

          section.about__photo {
            flex: 0 0 260px;
            width: 260px;
            max-width: 260px;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .page__about {
      main {
        .container {
          flex-direction: column;
          align-items: center;
          gap: 36px;
          padding: 32px 24px;

          section {
            &.about__timeline {
              width: 100%;
              max-width: 680px;
            }

            &.about__photo {
              flex: none;
              width: 100%;
              max-width: 280px;
              align-self: center;
            }
          }
        }
      }
    }

    .timeline {
      --timeline-date-width: 100px;
    }
  }

  @media (max-width: 600px) {
    .page__about {
      main {
        .container {
          padding: 24px 20px;
        }
      }
    }

    .timeline {
      --timeline-date-width: 88px;
      --timeline-dot-width: 16px;

      &__year {
        font-size: 18px;
      }
    }

    .timeline__card h3 {
      font-size: 20px;
    }

    .timeline__card p {
      font-size: 17px;
    }
  }
</style>
