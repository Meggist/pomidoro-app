function multiplicationTable(colStart, rowStart, size) {
    try {
        if (Number.isInteger(size) !== true || Number.isInteger(colStart) !== true
            || Number.isInteger(rowStart) !== true || colStart < 1 || rowStart < 1 || size < 1) {
                throw new Error('Function requires three integer arguments that are greater or equal than 1.')
        }
    } catch (error) {
        console.error(error.message)
        return error
    }

    const table = new Array(size+1);

    for (let i = 0; i < size+1; i++) {

        table[i] = new Array(size+1);

        for ( let j = 0; j < size+1; j++){
            if ( i === 0 && j===0 ) {
            table[0][0] = null;
            continue;
            }

            if (i === 0) {
            table[0][j] = colStart++;
                continue;
            }

            if (j === 0) {
                table[i][0] = rowStart++;
                continue;
            }

            table[i][j] = table[i][0] * table[0][j];
      }
    }
    return table
}

const table = multiplicationTable(1, 3, 4);
console.log(table)
