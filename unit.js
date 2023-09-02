// Define a function to perform matrix reduction to row-echelon form
function reduceMatrix() {
    // Retrieve matrix values from input fields
    const matrix = [
        [
            parseInt(document.getElementById("matrix00").value),
            parseInt(document.getElementById("matrix01").value),
            parseInt(document.getElementById("matrix02").value),
            parseInt(document.getElementById("matrix03").value),
        ],
        [
            parseInt(document.getElementById("matrix10").value),
            parseInt(document.getElementById("matrix11").value),
            parseInt(document.getElementById("matrix12").value),
            parseInt(document.getElementById("matrix13").value),
        ],
        [
            parseInt(document.getElementById("matrix20").value),
            parseInt(document.getElementById("matrix21").value),
            parseInt(document.getElementById("matrix22").value),
            parseInt(document.getElementById("matrix23").value),
        ],
        [
            parseInt(document.getElementById("matrix30").value),
            parseInt(document.getElementById("matrix31").value),
            parseInt(document.getElementById("matrix32").value),
            parseInt(document.getElementById("matrix33").value),
        ],
    ];

    const nrows = 4;
    const ncols = 4;

    const result = [];

    // Create a copy of the input matrix
    for (let i = 0; i < nrows; i++) {
        result.push([...matrix[i]]);
    }

    const steps = [];

    for (let pivotRow = 0; pivotRow < nrows; pivotRow++) {
        // Find the pivot element
        const pivotElement = result[pivotRow][pivotRow];

        steps.push({
            operation: `Pivot at R${pivotRow + 1}, C${pivotRow + 1}`,
            row: pivotRow,
            column: pivotRow,
            value: pivotElement,
        });

        // If the pivot element is zero, swap rows to find a non-zero pivot
        if (pivotElement === 0) {
            for (let i = pivotRow + 1; i < nrows; i++) {
                if (result[i][pivotRow] !== 0) {
                    // Swap rows
                    [result[pivotRow], result[i]] = [result[i], result[pivotRow]];

                    steps.push({
                        operation: `Swap R${pivotRow + 1} <-> R${i + 1}`,
                        rows: [pivotRow, i],
                    });

                    // Update pivot element
                    pivotElement = result[pivotRow][pivotRow];
                    break;
                }
            }
        }

        // Scale the pivot row so that the pivot element becomes 1
        const scaleFactor = 1 / pivotElement;
        for (let j = pivotRow; j < ncols; j++) {
            result[pivotRow][j] *= scaleFactor;
        }

        steps.push({
            operation: `Scale R${pivotRow + 1} by 1/${pivotElement}`,
            row: pivotRow,
            scale: scaleFactor,
        });

        // Eliminate other elements in the pivot column
        for (let i = pivotRow + 1; i < nrows; i++) {
            const factor = result[i][pivotRow];
            for (let j = pivotRow; j < ncols; j++) {
                result[i][j] -= factor * result[pivotRow][j];
            }

            steps.push({
                operation: `Subtract ${factor} * R${pivotRow + 1} from R${i + 1}`,
                fromRow: pivotRow,
                targetRow: i,
            });
        }
    }

    // Display the row-echelon form in the "result" div
    displayMatrix("result", result);

    // Display the steps in the "steps" div
    displaySteps("steps", steps);
}

// Function to display a matrix in an HTML element
function displayMatrix(elementId, matrix) {
    const element = document.getElementById(elementId);
    element.innerHTML = "<h2>Row-Echelon Form:</h2>";
    matrix.forEach((row) => {
        const rowString = row.map((value) => value.toFixed(0)).join("\t");
        element.innerHTML += rowString + "<br>";
    });
}

// Function to display steps in an HTML element
function displaySteps(elementId, steps) {
    const element = document.getElementById(elementId);
    element.innerHTML = "<h2>Steps:</h2>";
    steps.forEach((step) => {
        element.innerHTML += `${step.operation}<br>`;
    });
}
