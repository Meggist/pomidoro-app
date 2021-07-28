/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* root component starts here */
__webpack_require__(1); // include general styles

__webpack_require__(3); // include router

/* example of including header component */
__webpack_require__(4);

__webpack_require__(7)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5); // example of including component's styles

const title = document.querySelector('.header__title');
const header = document.querySelector('.header');
const menu = document.querySelector('.header__menu');
let isTimerHeader = document.querySelector(".timer-header");

window.onscroll = () => {
    if (window.pageYOffset > 110) {
        if (title) {
            title.style.display = 'none';
        }
        header.classList.add('fixed');
        header.classList.add('space-between');
        if (isTimerHeader) {
            header.classList.remove('timer-header');
        }
        document.querySelector('.header__logo').style.display = 'flex';
        if (menu.ElementfirstChild == document.querySelector(".icon-add.menu__icon")) {
            menu.insertAdjacentHTML('afterbegin', '<li class="icon-add menu__icon"></li>')
        }
    } else {
        if (title) {
            title.style.display = 'flex';
        }
        document.querySelector('.header__logo').style.display = 'none';
        header.classList.remove('fixed');
        header.classList.remove('space-between');
        if (isTimerHeader) {
            header.classList.add('timer-header');
        }
        const addMenuIcon = document.querySelector(".icon-add.menu__icon");
        addMenuIcon.parentNode.removeChild(addMenuIcon);
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

const minusButtons = Array.from(document.getElementsByClassName('icon-minus'));
const plusButtons = Array.from(document.getElementsByClassName('icon-add'));
const numbersButtons = Array.from(document.getElementsByClassName('counter__number'));
const defaultValues = numbersButtons.map(e => Number(e.value));

const counter = {
    changeNumber: (step, position, operation, edge) => {
        if (Number(numbersButtons[position].value) === edge) {
            return
        } else {
            if (operation === '-') {
                numbersButtons[position].value = Number(numbersButtons[position].value) - step
            } else {
                numbersButtons[position].value = Number(numbersButtons[position].value) + step
            }
            createCycle();
        }
    },

    returnToDefault: () => numbersButtons.forEach((elem, index) => {
        elem.value = defaultValues[index];
        createCycle();
    })
}

for (let i = 0; i < 4; i++) {
    switch (i) {
        case 0:
            minusButtons[i].onclick = () => counter.changeNumber(5, i, '-', 15);
            plusButtons[i].onclick = () => counter.changeNumber(5, i, '+', 25);
            break;
        case 1:
            minusButtons[i].onclick = () => counter.changeNumber(1, i, '-', 2);
            plusButtons[i].onclick = () => counter.changeNumber(1, i, '+', 5);
            break;

        case 2:
            minusButtons[i].onclick = () => counter.changeNumber(1, i, '-', 3);
            plusButtons[i].onclick = () => counter.changeNumber(1, i, '+', 5);
            break;

        case 3:
            minusButtons[i].onclick = () => counter.changeNumber(5, i, '-', 15);
            plusButtons[i].onclick = () => counter.changeNumber(5, i, '+', 30);
            break;
    }
}

const firstRow = document.getElementsByClassName('cycle__first-row')[0];
const secondRow = document.getElementsByClassName('cycle__second-row')[0];
const thirdRow = document.getElementsByClassName('cycle__third-row')[0];


const createCycle = () => {
    const iterationAmount = Number(numbersButtons[1].value);
    const workTime = (iterationAmount * 2) * Number(numbersButtons[0].value);
    const shortBreakTime = ((iterationAmount * 2) - 2) * Number(numbersButtons[2].value);
    const minutesSum = workTime + shortBreakTime + Number(numbersButtons[3].value);
    const firstCycle = (workTime + shortBreakTime) / 2 + (Number(numbersButtons[3].value));

    const createGraphElem = (color, index) => {
        const elem = document.createElement('div');
        elem.classList.add(color);
        elem.style.height = "10px";
        elem.style.width = ((Number(numbersButtons[index].value) / minutesSum) * 100) + '%';
        secondRow.appendChild(elem);
    }

    const createInfoElem = (side, row) => {
        const container = document.createElement('div');
        container.classList.add(`cycle__${side}-elem`);
        row.appendChild(container);
        const text = document.createElement('span');
        const point = document.createElement('div');
        text.classList.add(`cycle__${side}-text`);
        container.appendChild(text);
        point.classList.add('cycle__point');
        container.appendChild(point);
        return arr = [container, text, point];
    }

    firstRow.innerHTML = '';
    secondRow.innerHTML = '';
    thirdRow.innerHTML = '';

    let bottomTime = 0;

    for (let i = 0; i < iterationAmount * 2; i++) {

        createGraphElem('work', 0)

        if (i < 3) {
            const [topPoint, text, point] = createInfoElem('top', firstRow)

            switch (i) {
                case 0:
                    text.innerHTML = '0m';
                    break;
                case 1:
                    text.innerHTML = `First cycle: ${Math.floor(firstCycle/60)}h ${firstCycle%60}m`;
                    topPoint.style.marginLeft = ((firstCycle / minutesSum) * 100) + "%";
                    break;

                case 2:
                    topPoint.style.justifyContent = "flex-end";
                    point.style.float = "right";
                    text.innerHTML = `${Math.floor(minutesSum/60)}h ${minutesSum%60}m`;
                    topPoint.style.marginLeft = (((minutesSum - firstCycle) / minutesSum) * 100) + "%";
                    break;
            }
        }

        if (i < Math.floor(minutesSum / 30)) {
            const [bottomPoint, text, point] = createInfoElem('bottom', thirdRow);

            bottomTime += 30;
            bottomPoint.style.marginLeft = ((30 / minutesSum) * 100) + "%";
            if (i == 0) {
                text.innerHTML = '30m';
                text.classList.add('cycle__bottom-display');
                point.classList.add('cycle__bottom-display');
            } else {
                text.innerHTML = `${Math.floor(bottomTime/60)}h`;
                if (bottomTime % 60 === 30) {
                    text.innerHTML += ' 30m'
                    text.classList.add('cycle__bottom-display');
                    point.classList.add('cycle__bottom-display');
                }
            }
        }

        if (i !== iterationAmount - 1 && i !== (iterationAmount * 2) - 1) {
            createGraphElem('other', 2);
        }

        if (i == iterationAmount - 1) {
            createGraphElem('hobby', 3);
        }
    }
}
createCycle();

/***/ })
/******/ ]);