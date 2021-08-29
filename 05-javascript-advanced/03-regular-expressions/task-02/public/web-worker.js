const tbody = document.getElementById('worker-tbody')
const iterationsInput = document.getElementById('iterations')
const resultsInput = document.getElementById('results')
const startButton = document.getElementById('startCalculation')
const pi = 3.14159265359

const generatePoint = () => {
    let r = 16;
    let x = Math.random() * r * 2 - r;
    let y = Math.random() * r * 2 - r;
    return (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2))
}

const computePi = (iterations, results) => {
    let inCircle = 0
    for (let i = 1; i <= iterations; i++) {
        if (i%results === 0) {
            if (generatePoint()) {
                inCircle++;
            }
            tbody.innerHTML += `
            <tr>
              <td>${i}</td>
              <td>${inCircle / i * 4}</td>
              <td>${pi - inCircle / i * 4}</td>
            </tr>
            `
        } else {
            if (generatePoint()) {
                inCircle++;
            }
        }
    }
    startButton.disabled = false;
}

const webWorker = () => {
    tbody.innerHTML = ''
    const iterations = Number(iterationsInput.value)
    const results = Number(resultsInput.value)
    startButton.disabled = true;
    computePi(iterations, results)
}

startButton.addEventListener('click', webWorker)
