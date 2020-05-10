<template>
  <u
    class="consoleLine"
    :class="{ 'blinking': blinkStatus }"
  >{{ helloPrint }}</u>
</template>

<script>
export default {
  data() {
    return {
      helloStack: [
        'npm i -g skills',
        'npm i parse-hh',
        'hello_world',
        'hello.js',
        'Hello, world!',
        'hello.vue',
        'hello.php',
        'Hello.json'
      ],
      helloPrint: '',
      helloArr: [],
      nextMsg: [],
      blinkStatus: true
    }
  },

  watch: {
    helloArr(newArr) {
      this.helloPrint = newArr.join('');
    }
  },

  mounted() {
    const index = this.getRandFrom(0, this.helloStack.length);
    this.helloPrint = this.helloStack[index];

    this.helloScript(3000);
  },

  methods: {
    /* Gen random num in range */
    getRandFrom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    
    /* Start changing word after MS delay */
    helloScript(startMS) {
      this.helloArr = this.helloPrint.split('');
      this.genNext();

      setTimeout(this.clearConsole, startMS);
    },
    
    /* Get new word from helloStack */
    genNext() {
      const index = this.getRandFrom(0, this.helloStack.length);
      this.nextMsg = this.helloStack[index].split('');
    },

    /* Random delay on change symbol */
    typeDelay(cb) {
      const RAND_MS = this.getRandFrom(50, 200);
      setTimeout(cb, RAND_MS);
    },

    /* Delete symbol */
    clearConsole() {
      this.blinkStatus = false;

      this.typeDelay(() => {
        const regExp = new RegExp('^' + this.helloPrint.toLowerCase());
        const consoleMatch = this.nextMsg.join('').match(regExp);
        const sameWord = consoleMatch ? consoleMatch[0] : null;
        const consoleEmpty = this.helloArr.length === 0;

        if(consoleEmpty || this.helloPrint === sameWord) {
          this.nextMsg = this.nextMsg.join('').replace(regExp, '').split('');
          this.blinkStatus = true;
          this.pushToConsole();
        } else {
          this.helloArr.pop();
          this.clearConsole();
        }
      })
    },

    pushToConsole() {
      this.blinkStatus = false;

      this.typeDelay(() => {
        if(this.nextMsg.length > 0) {
          this.helloArr.push(this.nextMsg.shift());
          this.pushToConsole();
        } else {
          this.blinkStatus = true;
          this.helloScript(2000);
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .consoleLine {
    background: rgb(12, 12, 12);
    text-decoration: none;
    display: block;
    box-sizing: border-box;
    position: relative;
    width: 110%;
    left: -5%;
    top: 0px;
    padding: 10px;
    color: #535a55;
    font-family: consolas;
    font-weight: normal;
    font-size: 30px;
    white-space: nowrap;
    overflow: hidden;

    &:before {
      content: 'C:\\> '
    }

    &:after {
      content: '█';
    }

    @keyframes cursorBlinking {
      0% {
        content: ''
      }

      100% {
        content: '█';
      }
    }

    &.blinking {
      &:after {
        animation-name: cursorBlinking;
        animation-iteration-count: infinite;
        animation-duration: 800ms;
        animation-timing-function: steps(2);
      }
    }
  }
</style>