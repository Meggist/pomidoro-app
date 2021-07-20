const tableRenderButton = document.getElementsByTagName('button')[0];

const renderTable = (event) => {
    event.preventDefault();

    const colStart = +document.getElementsByClassName('js-config-output-cols')[0].value;
    const rowStart = +document.getElementsByClassName('js-config-output-rows')[0].value;
    const tableSize = +document.getElementsByClassName('js-config-output-size')[0].value;

    if (Number.isInteger(tableSize) !== true || Number.isInteger(colStart) !== true
        || Number.isInteger(rowStart) !== true || colStart < 1 || rowStart < 1 || tableSize < 1) {
        alert('Function requires three integer arguments that are greater or equal than 1')
        return;
    }

    const tableValues = multiplicationTable(colStart, rowStart, tableSize);
    const table = document.getElementsByTagName('table')[0];
    const tBody = table.tBodies[0];

    while(table.rows.length > 0) {
        table.deleteRow(0);
    }

    table.tHead.insertRow(-1);

    for ( let k = 0; k < tableSize+1; k++) {
        const th = document.createElement('th');
        th.innerHTML = tableValues[0][k];
        const tr = table.tHead.children[0];
        tr.appendChild(th);
    }

    for (let i = 1; i < tableSize+1; i++) {
        tBody.insertRow(-1);
        for (let j = 0; j < tableSize+1; j++){
            if ( j===0) {
                const th = document.createElement('th');
                th.innerHTML = tableValues[i][0];
                const tr = tBody.children[i-1];
                tr.appendChild(th);
                continue;
            }
            const cell = table.rows[i].insertCell(-1);
            cell.innerHTML = tableValues[i][j];
        }
    }

    const addHover = ({target}) => {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            target.classList.add('hover');
            row.firstElementChild.classList.add('hover');
            table.tHead.firstElementChild.children[target.cellIndex].classList.add('hover');
        }
    }

    const deleteHover = ({target}) => {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            target.classList.remove('hover');
            row.firstElementChild.classList.remove('hover');
            table.tHead.firstElementChild.children[target.cellIndex].classList.remove('hover');
        }
    }


    const swapRows = ({target}) => {
        if (target.tagName === 'TD') {
            const row = target.parentNode;
            const previousRow = row.previousSibling;
            previousRow.before(row);
        }
    }

    const deleteRow = ({target, ctrlKey}) => {
        if (ctrlKey) {
            if (target.tagName === 'TD') {
                const row = target.parentNode;
                tBody.removeChild(row);
            }
        }
    }

    table.addEventListener('mouseover', addHover);
    table.addEventListener('mouseout', deleteHover);
    table.addEventListener('click', swapRows);
    table.addEventListener('click', deleteRow);
}

tableRenderButton.addEventListener('click', renderTable)





