function dolog(msg) {
  const now = new Date().getTime()
  console.log(`[${now}] ${msg}`)
}

function doNothing() {
}

class Worker {
  private tasks = []

  constructor(name) {
    this.tasks.push(['hello', name])
    this.nextWork(0)
  }

  private work() {
    if (this.tasks.length > 0) {
      const task = this.tasks[0]
      this.tasks = this.tasks.slice(1)
      const [command, arg] = task
      switch (command) {
        case 'firstSleep': {
          const time = arg * 1000
          this.nextWork(time, null, () => dolog('wait in ' + arg + ' s'))
          return
        }
        case 'sleep': {
          const time = arg * 1000
          this.nextWork(time, () => dolog('wait in ' + arg + ' s'))
          return
        }
        case 'hello': {
          dolog('hello ' + arg)
          break
        }
        case 'eat': {
          dolog('eat ' + task[1])
          break
        }
      }
      this.nextWork()
    }
  }

  private nextWork(ms = 0, beforeWork: () => void = doNothing, afterWork: () => void = doNothing) {
    beforeWork = beforeWork || doNothing
    afterWork = afterWork || doNothing
    setTimeout(() => {
      beforeWork()
      this.work()
      afterWork()
    }, ms)
  }

  public sleep(s: number) {
    this.tasks.push(['sleep', s])
    return this
  }

  public firstSleep(s: number) {
    this.tasks.unshift(['firstSleep', s])
    return this
  }

  public eat(food: String) {
    this.tasks.push(['eat', food])
    return this
  }
}

// function MainDeplay(name) {
//   return new Worker(name)
// }

// function testCase1() {
//   dolog('Test Case 1')
//   MainDeplay('Helen')
// }

// function testCase2() {
//   dolog('Test Case 2')
//   MainDeplay('Helen').sleep(3).eat('dinner')
// }

// function testCase3() {
//   dolog('Test Case 3')
//   MainDeplay('Helen').eat('dinner').eat('fruits')
// }

// function testCase4() {
//   dolog('Test Case 4')
//   MainDeplay('Helen').firstSleep(3).eat('dinner')
// }

// testCase1()
// testCase2()
// testCase3()
// testCase4()
