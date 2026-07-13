<template>
  <div class="container attachPage">
    <section 
      class="skills changeTab"
      :class="showSkills"
    >
      <div class="wrapper">
        <h2>{{ state.subtitle.pages[1] }}</h2>
        <span>рассчитываются исходя из частоты использования в проектах</span>
        <figure 
          v-for="(skill, s_key) in skillsList" 
          :key="s_key" 
          class="skills__item"
        >
          <i class="icon">
            <svg width="100%" height="100%">
              <use :xlink:href="getSkillSVG(skill.name)" overflow="visible" />
            </svg>
          </i>
          <figcaption>
            <span>{{ skill.title }}</span>
            <u class="skills__line">
              <hr :style="{ 'width': skill.level + '%' }">
            </u>
          </figcaption>
        </figure>
      </div>
    </section>
    <section 
      class="works changeTab attachedBlock"
      :class="showWorks"
    >
      <h2 class="attachedBlock__head">
        <div>
          Работы
          <span>[{{ works.length }}]</span>
        </div>
      </h2>
      <div class="wrapper">
        <figure 
          v-for="(work, w_key) in works" 
          :key="w_key" 
          class="works__item"
          @click="openPanel(w_key)"
        >
          <img :src="publicPath(work.img)" alt="">
          <figcaption>
            <h3>{{ work.title }}</h3>
            <span v-if="work.url" class="works__item-url">{{ cutUrl(work.url) }}</span>
            <span class="works__item-action">Подробнее</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="infoPanel" :class="{ 'show': movePanel }">
      <div class="infoPanel__head">
        <button @click="closePanel">
          <i class="arrow"><svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.7071 8.70711C40.0976 8.31659 40.0976 7.68342 39.7071 7.2929L33.3431 0.928935C32.9526 0.538411 32.3195 0.538411 31.9289 0.928935C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM-8.74228e-08 9L39 9L39 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#1D2138"></path></svg></i>
          <span>Назад</span>
        </button>
      </div>
      <div v-if="infoPanel" class="infoPanel__info">
        <h3>{{ infoPanelHead }}</h3>
        <p v-if="!metaEmpty" class="infoPanel__meta">
          <span v-if="infoPanel.meta.employer"><b>Заказчик</b>: {{ infoPanel.meta.employer }}</span>
          <span v-if="infoPanel.meta.year"><b>Год</b>: {{ infoPanel.meta.year }}</span>
          <span><b>Технологии</b>: 
            <i
              v-for="(tech, t_index) in infoTechList"
              :key="t_index"
              class="infoPanel__tags"
            >
              {{ tech }}
            </i>
          </span>
        </p>
        <p class="infoPanel__text">{{ infoPanel.description }}</p>
        <p class="infoPanel__btns">
          <a class="btnDefault" v-if="infoPanel.demo" :href="infoPanel.demo" target="_blank">
            <i class="icon">
              <svg width="100%" height="100%" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
            </i>
            Демо
          </a>
          <a class="btnDefault" v-if="infoPanel.github" :href="infoPanel.github" target="_blank">
            <i class="icon">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" class="svg-inline--fa fa-github fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
            </i>
            на GitHub
          </a>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import state from '../appState.js'
import techsSvg from '../assets/svg/techs.svg?url'
import { publicPath } from '../utils/publicPath.js'

export default {
  data() {
    return {
      blockAttached: false,
      workActive: false,
      addScroll: false,
      displayWorks: 'flex',
      displaySkills: 'flex',
      currentPanel: null,
      movePanel: false,
      works: [],
      skills: [],
      state
    }
  },

  computed: {
    infoPanelHead() {
      return this.infoPanel.url ? this.cutUrl(this.infoPanel.url) : this.infoPanel.title
    },

    infoTechList() {
      return this.infoPanel.meta.tech.map((tech) => {
        const skill = this.skills.find(skill => skill.name === tech);
        return skill ? skill.title : null;
      }).filter(skill => skill);
    },

    showPanel() {
      return this.currentPanel !== null
    },

    infoPanel() {
      return this.showPanel ? this.works[this.currentPanel] : null
    },

    metaEmpty() {
      return this.infoPanel.meta.tech.length === 0
    },

    showSkills() {
      return { 
        'show': !this.workActive && !state.firstLoad,
        'hide': this.workActive && !state.firstLoad,
        'low-layer': this.state.menuOpened,
        'undisplayed': !this.displaySkills,
        'add-scroll': this.addScroll
      }
    },

    showWorks() {
      return { 
        'sticked': this.blockAttached, // Attach on desk
        'show': this.workActive, // Show curr tab on mobile
        'hide': !this.workActive && !state.firstLoad, // Hide prev tab on mobile
        'low-layer': this.state.menuOpened, // Change block pos if menu opened
        'undisplayed': !this.displayWorks
      }
    },

    skillsList() {
      return this.skills.map((skill) => {
        // Count level by num of works
        let skillCount = 0;
        this.works.forEach((work) => {
          if(work.meta.tech.indexOf(skill.name) !== -1) skillCount++;
        });

        skill.level = skillCount / this.works.length * 100;

        return skill
      })
        .filter(skill => skill.level !== 0)
        .sort((a, b) => b.level - a.level)
      
    }
  },

  watch: {
    'workActive': function(workShowed) {
      // this.displayWorks = workShowed;

      setTimeout(() => {
        // this.displaySkills = !workShowed;
        // this.displayWorks = !workShowed;
        this.displayWorks = workShowed;
      }, 1000);
    },
    'showPanel': function(showed) {
      setTimeout(() => {
        document.body.style.overflowY = showed ? 'hidden' : 'auto';
        this.movePanel = showed
      }, 0);
    },
    'state.subtitle.current': function(tabIndex) {
      this.workActive = tabIndex === 0
      this.state.firstLoad = false
    }
  },

  mounted() {
    this.getData('skills');
    this.getData('works');
    // Sort works by year
    this.works.sort((a, b) => b.meta.year - a.meta.year)
    
    // Enable subtitle for this page
    this.state.subtitle.active = true
    this.state.subtitle.current = 0
    this.showAttach()

    this.state.firstLoad = true;
  },

  beforeRouteLeave(to, from, next) {
  // Hide attached block when leave route
    // const $block = document.querySelector('.attachedBlock')
    // $block.classList.remove('show')
    // setTimeout(next, 370)

    this.state.firstLoad = true;

    next();
  },

  methods: {
    publicPath,

    getData(type) {
      fetch(publicPath(`data/${type}.data.json`))
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          this[type] = data;
        })
    },

    getSkillSVG(name) {
      return `${techsSvg}#${name}`
    },

    cutUrl(url) {
      if(!url) {
        return;
      }
      
      url = url.replace('https://', '').replace('http://', '')

      return url
    },

    showAttach() {
      setTimeout(() => {
        this.workActive = true
        this.blockAttached = true

        // wait for transition ending => then show scroll
        setTimeout(() => {
          this.addScroll = true
        }, 400)
      }, 300)
    },

    openPanel(index) {
      this.currentPanel = index
    },

    closePanel() {
      this.currentPanel = null
    },
  }
}
</script>

<style lang="scss">
  main {
    .skills {
      height: calc(100% - 71px) !important;
      padding: 20px 40px;
      display: flex;
      justify-content: center;
      color: $lightBlue;
      overflow-y: hidden;

      &.add-scroll {
        padding-right: 23px;
        overflow-y: auto;
      }

      .wrapper {
        width: 100%;
        max-width: 90%;

        & > span {
          display: block;
          color: rgba(216, 255, 255, 0.2);
          margin-bottom: 30px;
        }
        
        h2 {
          font-family: "Montserrat";
          font-size: 28px;
          margin-top: 20px;
        }
      }

      &__item {
        width: 100%;
        display: flex;
        color: $lightBlue;
        margin-bottom: 30px;

        i.icon {
          width: 35px;
          min-width: 35px;
          height: 35px;
        }

        figcaption {
          flex: 1;
          font-size: 17px;
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          u {
            background-color: #3B4F62;
            hr {
              border: 0;
              border-bottom: 4px solid $lightBlue;
            }
          }
        }
      }
    }

    .works {
      .wrapper {
        display: flex;
        flex-direction: column;
        gap: 28px;
        padding: 28px 32px 36px;
      }

      &__item {
        position: relative;
        display: block;
        overflow: hidden;
        flex: 0 0 auto;
        width: 100%;
        height: 30vw;
        max-height: 320px;
        min-height: 220px;
        margin-bottom: 0;
        border-radius: 14px;
        background: #2A343D;
        border: 1px solid rgba(216, 255, 255, 0.08);
        box-shadow:
          0 10px 28px rgba(0, 0, 0, 0.32),
          0 2px 8px rgba(0, 0, 0, 0.18);
        cursor: pointer;
        transition:
          transform $trDelay,
          box-shadow $trDelay,
          border-color $trDelay;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(29, 33, 56, 0) 45%,
            rgba(29, 33, 56, 0.72) 100%
          );
          opacity: 0.45;
          transition: opacity $trDelay;
          pointer-events: none;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 400ms ease, filter $trDelay;
        }

        figcaption {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(
            180deg,
            rgba(42, 52, 61, 0.15) 0%,
            rgba(29, 33, 56, 0.94) 100%
          );
          position: absolute;
          inset: 0;
          color: #fff;
          font-family: 'Montserrat', Verdana;
          font-size: 1em;
          opacity: 0;
          transition: opacity $trDelay;

          h3 {
            padding: 0 24px;
            text-align: center;
            transform: translateY(10px);
            transition: transform $trDelay;
          }
        }

        &-url {
          display: block;
          padding: 0 16px;
          text-align: center;
          color: rgba(216, 255, 255, 0.72);
          font-size: 0.92em;
          transform: translateY(10px);
          transition: transform $trDelay;
        }

        &-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
          padding: 11px 24px;
          border-radius: 999px;
          background: $lightBlue;
          color: #1D2138;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.03em;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transform: translateY(16px);
          opacity: 0;
          transition: transform $trDelay, opacity $trDelay, background $trDelay;
        }

        &:hover {
          transform: translateY(-4px);
          border-color: rgba(216, 255, 255, 0.32);
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.42),
            0 4px 12px rgba(0, 0, 0, 0.22),
            0 0 0 1px rgba(216, 255, 255, 0.14);

          &::after {
            opacity: 0;
          }

          img {
            transform: scale(1.06);
            filter: brightness(0.72);
          }

          figcaption {
            opacity: 1;
          }

          h3,
          .works__item-url {
            transform: translateY(0);
          }

          .works__item-action {
            transform: translateY(0);
            opacity: 1;
          }
        }

        &:hover .works__item-action {
          background: #fff;
        }
      }
    }
  }

  @media (max-width: 600px) {
    main .works {
      .wrapper {
        gap: 20px;
        padding: 20px 16px 28px;
      }

      &__item {
        height: 250px;
        min-height: 250px;
        max-height: none;
        border-radius: 12px;
      }
    }
  }
</style>