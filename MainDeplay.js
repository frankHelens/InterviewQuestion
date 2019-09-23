function dolog(msg) {
    var now = new Date().getTime();
    console.log("[" + now + "] " + msg);
}
function doNothing() {
}
var Worker = /** @class */ (function () {
    function Worker(name) {
        this.tasks = [];
        this.tasks.push(['hello', name]);
        this.nextWork(0);
    }
    Worker.prototype.work = function () {
        if (this.tasks.length > 0) {
            var task = this.tasks[0];
            this.tasks = this.tasks.slice(1);
            var command = task[0], arg_1 = task[1];
            switch (command) {
                case 'firstSleep': {
                    var time = arg_1 * 1000;
                    this.nextWork(time, null, function () { return dolog('wait in ' + arg_1 + ' s'); });
                    return;
                }
                case 'sleep': {
                    var time = arg_1 * 1000;
                    this.nextWork(time, function () { return dolog('wait in ' + arg_1 + ' s'); });
                    return;
                }
                case 'hello': {
                    dolog('hello ' + arg_1);
                    break;
                }
                case 'eat': {
                    dolog('eat ' + task[1]);
                    break;
                }
            }
            this.nextWork();
        }
    };
    Worker.prototype.nextWork = function (ms, beforeWork, afterWork) {
        var _this = this;
        if (ms === void 0) { ms = 0; }
        if (beforeWork === void 0) { beforeWork = doNothing; }
        if (afterWork === void 0) { afterWork = doNothing; }
        beforeWork = beforeWork || doNothing;
        afterWork = afterWork || doNothing;
        setTimeout(function () {
            beforeWork();
            _this.work();
            afterWork();
        }, ms);
    };
    Worker.prototype.sleep = function (s) {
        this.tasks.push(['sleep', s]);
        return this;
    };
    Worker.prototype.firstSleep = function (s) {
        this.tasks.unshift(['firstSleep', s]);
        return this;
    };
    Worker.prototype.eat = function (food) {
        this.tasks.push(['eat', food]);
        return this;
    };
    return Worker;
}());
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
// testCase4()\
