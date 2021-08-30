const map = document.querySelector("#map")
const key = "AIzaSyCukF0uuLcSicmkgXN2q1FAqMVbZpvQYKE"


function initMap() {
    const showPosition = position => {
        if (locations.length < 19) {
            const coordinates = [position.coords.latitude, position.coords.longitude]
            updateMap(coordinates)
        } else {
            navigator.geolocation.clearWatch(watchId)
            document.getElementById('mapLink').parentNode.removeChild(document.getElementById('mapLink'))
            locations = []
            window.history.pushState({}, '', '')
            changeCheckbox('')
        }
    }

    const updateMap = coordinates => {
        locations.push(coordinates)
        map.src = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates[0]},${coordinates[1]}&zoom=12&size=400x400&key=${key}`
    }

    let locations = []
    let watchId

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(showPosition)
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}


class Router {
    constructor(name, routes) {
        this.name = name
        this.routes = routes
    }
}

let routerInstance = new Router('routerInstance', [
    {
        path: "/",
        name: "Default"
    },
    {
        path: '/geolocation',
        name: "Geolocation"
    },
    {
        path: '/synccalculation',
        name: "Sync calculation"
    },
    {
        path: '/webworker',
        name: "Web Worker"
    }

])
window.onload = () => {
    let definedRoutes = Array.from(document.querySelectorAll('.link'))
    const navigate = ({target}) => {
        let route = target.parentNode.attributes[0].value
        let routeInfo = routerInstance.routes.filter(item => item.name === route)[0]
        if (!routeInfo) {
            window.history.pushState({}, '', 'error')
            changeCheckbox('')
        } else {
            window.history.pushState({}, '', routeInfo.path)
            changeCheckbox(routeInfo.path)
            if (routeInfo.path === '/geolocation') {
                const script = document.createElement("script")
                script.id = 'mapLink'
                script.async = true
                script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
                document.head.appendChild(script)
            }
        }
    }

    definedRoutes.forEach(route => route.addEventListener('click', navigate))
    const currentPath = window.location.pathname;

    if (currentPath === '/') {
        changeCheckbox('')
    } else {
        let route = routerInstance.routes.filter(r => r.path === currentPath)[0];
        if (route) {
            changeCheckbox(route.path.slice(1))
        } else {
            window.history.replaceState({}, '', '/')
            changeCheckbox('')
        }
    }
}

const changeCheckbox = idOfCheckBox => {
    let arrayOfCheckBox = Array.from(document.querySelectorAll('.checkbox'))
    arrayOfCheckBox.forEach(check => check.checked = false)
    if (idOfCheckBox === '') {
        const checkbox = document.getElementById('/')
        checkbox.checked = true
    } else {
        const checkbox = document.getElementById(idOfCheckBox)
        checkbox.checked = true
    }
}


const toggleFullScreen = button => {
    if (!document.fullscreenElement) {
        button.closest('.content-block').requestFullscreen()
        button.innerHTML = '-'
    } else if (document.exitFullscreen) {
        document.exitFullscreen()
        button.innerHTML = '+'
    }
}

let fullScreenButtons = Array.from(document.querySelectorAll('.toggle-button'))
fullScreenButtons.forEach(item => item.addEventListener('click', () => toggleFullScreen(item)));


//I mustn't change this function follow application requirements
(function () {
    'use strict';

    let ITERATIONS = 100000000;

    //Function that generates random coordinates for point(x:[-r,r), y:[-r,r))
    //and checks if it is in a circle with radius r
    let generatePoint = function () {
        let r = 16;
        let x = Math.random() * r * 2 - r;
        let y = Math.random() * r * 2 - r;
        return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
    };

    //Return estimated value of Pi after all iterations
    let computePi = function () {
        let inCircle = 0;
        let i;
        for (i = 0; i < ITERATIONS; i++) {
            if (generatePoint()) {
                inCircle++;
            }
        }
        return inCircle / ITERATIONS * 4;
    };

    //Performs synchronous calculations of Pi after click on button
    document.querySelector('#syncstart').addEventListener('click', function () {
        document.querySelector('#syncresult').innerHTML = computePi();
    });
})();


