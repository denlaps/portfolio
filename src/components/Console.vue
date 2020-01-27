<template>
  <u class="consoleLine">{{ helloPrint }}</u>
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
      nextMsg: []
    }
  },

  watch: {
    helloArr(newArr) {
      this.helloPrint = newArr.join('')
    }
  },

  mounted() {
    const index = this.getRandFrom(0, this.helloStack.length)
    this.helloPrint = this.helloStack[index]

    this.helloScript(3000)
  },

  methods: {
    /* Gen random num in range */
    getRandFrom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    
    /* Start changing word after MS delay */
    helloScript(startMS) {
      this.helloArr = this.helloPrint.split('')
      this.genNext()

      setTimeout(this.clearConsole, startMS);
    },
    
    /* Get new word from helloStack */
    genNext() {
      const index = this.getRandFrom(0, this.helloStack.length)
      this.nextMsg = this.helloStack[index].split('')
    },

    /* Random delay on change symbol */
    typeDelay(cb) {
      const RAND_MS = this.getRandFrom(100, 300)
      setTimeout(cb, RAND_MS)
    },

    /* Delete symbol */
    clearConsole() {
      this.typeDelay(() => {
        const regExp = new RegExp('^' + this.helloPrint)
        const consoleMatch = this.nextMsg.join('').match(regExp)
        const sameWord = consoleMatch ? consoleMatch[0] : null
        const consoleEmpty = this.helloArr.length === 0

        if(consoleEmpty || this.helloPrint === sameWord) {
          this.nextMsg = this.nextMsg.join('').replace(regExp, '').split('')
          this.pushToConsole()
        } else {
          this.helloArr.pop()
          this.clearConsole()
        }
      })
    },

    pushToConsole() {
      this.typeDelay(() => {
        if(this.nextMsg.length > 0) {
          this.helloArr.push(this.nextMsg.shift())
          this.pushToConsole()
        } else {
          this.helloScript(2000)
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

    @keyframes cursorBlinking {
      0% {
        content: ''
      }

      100% {
        content: '█';
      }
    }

    &:before {
      content: 'C:\\> '
    }

    &:after {
      content: '█';
      animation-name: cursorBlinking;
      animation-iteration-count: infinite;
      animation-duration: 1s;
      animation-timing-function: steps(2);
    }
  }
</style>