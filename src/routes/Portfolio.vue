<template>
  <div class="container">
    <section 
      class="skills changeTab"
      :class="showSkills"
      :style="{ overflowY: addScroll }"
    >
      <div class="wrapper">
        <h2>Skills</h2>
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
        <span>* calculated based on frequency of use in projects</span>
      </div>
    </section>
    <section 
      class="works changeTab attachedBlock"
      :class="showWorks"
    >
      <h2 class="attachedBlock__head">Works</h2>
      <div class="wrapper">
        <figure 
          v-for="(work, w_key) in works" 
          :key="w_key" 
          class="works__item"
          @click="openPanel(w_key)"
        >
          <img :src="work.img" alt="">
          <figcaption>
            <h3>{{ work.title }}</h3>
            <span>{{ cutUrl(work.url) }}</span>
            <i class="fas fa-search"></i>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="infoPanel" :class="{ 'show': movePanel }">
      <div class="infoPanel__head">
        <button @click="closePanel">
          <i class="arrow"><svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.7071 8.70711C40.0976 8.31659 40.0976 7.68342 39.7071 7.2929L33.3431 0.928935C32.9526 0.538411 32.3195 0.538411 31.9289 0.928935C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM-8.74228e-08 9L39 9L39 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#1D2138"></path></svg></i>
          <span>Back</span>
        </button>
      </div>
      <div v-if="infoPanel" class="infoPanel__info">
        <h3>{{ infoPanelHead }}</h3>
        <p v-if="!metaEmpty" class="infoPanel__meta">
          <span v-if="infoPanel.meta.employer"><b>Employer</b>: {{ infoPanel.meta.employer }}</span>
          <span v-if="infoPanel.meta.year"><b>Year</b>: {{ infoPanel.meta.year }}</span>
          <span><b>Technologies</b>: 
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
            Demo
          </a>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import state from '../appState'
import works from '../data/works.data'
import skills from '../data/skills.data'

export default {
  data() {
    return {
      blockAttached: false,
      workActive: false,
      addScroll: 'unset',
      currentPanel: null,
      movePanel: false,

      state, works, skills
    }
  },

  computed: {
    infoPanelHead() {
      return this.infoPanel.url ? this.cutUrl(this.infoPanel.url) : this.infoPanel.title
    },

    infoTechList() {
      return this.infoPanel.meta.tech.map((tech) => {
        return this.skills.find(skill => skill.name === tech).title
      });
    },

    showPanel() {
      return this.currentPanel !== null
    },

    infoPanel() {
      return this.showPanel ? works[this.currentPanel] : null
    },

    metaEmpty() {
      return this.infoPanel.meta.tech.length === 0
    },

    showSkills() {
      return { 
        'show': !this.workActive && !state.firstLoad,
        'hide': this.workActive && !state.firstLoad,
        'low-layer': this.state.menuOpened 
      }
    },

    showWorks() {
      return { 
        'sticked': this.blockAttached, // Attach on desk
        'show': this.workActive, // Show curr tab on mobile
        'hide': !this.workActive && !state.firstLoad, // Hide prev tab on mobile
        'low-layer': this.state.menuOpened // Change block pos if menu opened
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
    getSkillSVG(name) {
      return require('../assets/svg/techs.svg') + '#' + name
    },

    cutUrl(url) {
      if(!url) {
        return;
      }
      
      url = url.replace('https://', '').replace('http://', '')

      return url[0].toUpperCase() + url.slice(1)
    },

    showAttach() {
      setTimeout(() => {
        this.workActive = true
        this.blockAttached = true

        // wait for transition ending => then show scroll
        setTimeout(() => {
          this.addScroll = 'auto'
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

      .wrapper {
        width: 100%;
        max-width: 90%;

        & > span {
          display: block;
          margin: 40px 0;
        }
      }

      h2 {
        font-family: "Montserrat";
        font-size: 28px;
        margin-bottom: 20px;
        margin-left: 50px;
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
      &__item {
        position: relative;
        display: flex;
        overflow: hidden;
        max-height: 400px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform $trDelay;
        }

        figcaption {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, .77);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          font-family: 'Montserrat', Verdana;
          font-size: 1em;
          cursor: pointer;
          opacity: 0;
          transition: opacity $trDelay;

          i {
            margin-top: 15px;
            font-size: 36px;
          }

          h3 {
            padding: 0 20px;
            text-align: center;
          }

          span {
            display: block;
            padding: 0 10px;
            text-align: center;
          }
        }

        &:hover {
          img {
            transform: scale(1.1);
          }

          figcaption {
            opacity: 1;
          }
        }
      }
    }
  }
</style>