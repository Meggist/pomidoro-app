let tableRenderButton = document.getElementsByTagName('button')[0];

tableRenderButton.onclick = (event) => {
    event.preventDefault();

    let colStart = +document.getElementsByClassName('js-config-output-cols')[0].value;
    let rowStart = +document.getElementsByClassName('js-config-output-rows')[0].value;
    let tableSize = +document.getElementsByClassName('js-config-output-size')[0].value;

    if (Number.isInteger(tableSize) !== true || Number.isInteger(colStart) !== true
        || Number.isInteger(rowStart) !== true || colStart < 1 || rowStart < 1 || tableSize < 1) {
        alert('Function requires three integer arguments that are greater or equal than 1')
        return;
    }

    let tableValues = multiplicationTable(colStart, rowStart, tableSize);

    let table = document.getElementsByTagName('table')[0];

    while(table.rows.length > 0) {
        table.deleteRow(0);
    }

    table.tHead.insertRow(-1);

    for ( let k = 0; k < tableSize+1; k++) {
        let th = document.createElement('th');
        th.innerHTML = tableValues[0][k];
        let tr = table.tHead.children[0];
        tr.appendChild(th);
    }

    let tBody = document.getElementsByTagName('tbody')[0];

    for ( let i = 1; i < tableSize+1; i++) {
        tBody.insertRow(-1);
        for (let j = 0; j < tableSize+1; j++){
            if ( j===0) {
                let th = document.createElement('th');
                th.innerHTML = tableValues[i][0];
                let tr = tBody.children[i-1];
                tr.appendChild(th);
                continue
            }
            let cell = table.rows[i].insertCell(-1);
            cell.innerHTML = tableValues[i][j];
        }
    }

    table.onmouseover = (event) => {
        let target = event.target;
        if (target.tagName === 'TD') {
            target.classList.add('hover');
            let row = target.parentNode;
            row.firstElementChild.classList.add('hover');
            table.tHead.firstElementChild.children[target.cellIndex].classList.add('hover');
        }

    }

    table.onmouseout = (event) => {
        let target = event.target;
        if (target.tagName === 'TD') {
            target.classList.remove('hover');
            let row = target.parentNode;
            row.firstElementChild.classList.remove('hover');
            table.tHead.firstElementChild.children[target.cellIndex].classList.remove('hover');
        }
    }


    table.addEventListener('click', (event) => {
        let target = event.target;

        if (target.tagName === 'TD') {
            let row = target.parentNode;
            let tbody = row.parentNode;
            let previousRow = tbody.children[row.rowIndex-2];
            if (previousRow !== undefined){
                previousRow.insertAdjacentElement('beforebegin', row)
            }
        }

        if(event.ctrlKey){
            if (target.tagName === 'TD') {
                let row = target.parentNode;
                let tbody = row.parentNode;
                tbody.removeChild(row)
            }
        }
    })
}




