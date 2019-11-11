/*
    Berkay Balyemez
    Berkay_Balyemez@student.uml.edu
    UMass Lowell - GUI Programming I

    Assignment 6 Javascript file
*/

var horz1 = $('#input_horz1');
var horz2 = $('#input_horz2');
var vert1 = $('#input_vert1');
var vert2 = $('#input_vert2');

var errorMessage = $('#error_message');

var button_generate = document.getElementById('button_generate');
var generated_table = document.getElementById('generated_table');

button_generate.onclick = function () {
    var horz1_val = horz1.val();
    var horz2_val = horz2.val();
    var vert1_val = vert1.val();
    var vert2_val = vert2.val();

    // Clear errors
    horz1.removeClass('is-invalid');
    horz2.removeClass('is-invalid');
    vert1.removeClass('is-invalid');
    vert2.removeClass('is-invalid');
    errorMessage.addClass('invisible');

    // Validate input and generate the table if the input is valid
    if (validateInput(horz1_val, horz2_val, vert1_val, vert2_val)) {
        // Convert from String to Number (this may not be necessary)
        var h1 = Number.parseInt(horz1_val);
        var h2 = Number.parseInt(horz2_val);
        var v1 = Number.parseInt(vert1_val);
        var v2 = Number.parseInt(vert2_val);

        if (h1 > h2) {
            // Smaller number will be h1
            var tmp = h2;
            h2 = h1;
            h1 = tmp;
        }
        if (v1 > v2) {
            // Smaller number will be v1
            var tmp = v2;
            v2 = v1;
            v1 = tmp;
        }

        generateTable(h1, h2, v1, v2);
    }
};

function validateInput(horz1_val, horz2_val, vert1_val, vert2_val) {
    var inputIsValid = true;

    if (!isValidNumber(horz1_val)) {
        horz1.addClass('is-invalid');
        inputIsValid = false;
    }
    if (!isValidNumber(horz2_val)) {
        horz2.addClass('is-invalid');
        inputIsValid = false;
    }
    if (!isValidNumber(vert1_val)) {
        vert1.addClass('is-invalid');
        inputIsValid = false;
    }
    if (!isValidNumber(vert2_val)) {
        vert2.addClass('is-invalid');
        inputIsValid = false;
    }

    if (!inputIsValid) {
        // Invalid input detected, show the error message
        errorMessage.removeClass('invisible');
        return false;
    }
    return true;
}

function isValidNumber(value) {
    // True if positive integer
    // Letter e is for exponentials; consider it invalid
    if (isNaN(value) || value <= 0 || value.includes('.') || value.includes('e') || value.includes('E')) {
        return false;
    }
    return true;
}

function generateTable(h1, h2, v1, v2) {
    // Clear old table
    generated_table.innerHTML = '';

    var mTable = document.createElement('table');
    mTable.className += 'table customTable';

    var topRow = mTable.insertRow();
    var cell = topRow.insertCell(); // Empty cell in top-left
    cell.style.backgroundColor = '#4f545c';
    cell.style.color = 'orange';

    // Populate the top cell with the horizontal range
    for (var i = h1; i <= h2; ++i) {
        var cell = topRow.insertCell();
        cell.style.backgroundColor = '#4f545c';
        cell.style.color = 'orange';
        cell.appendChild(document.createTextNode(i));
    }


    for (var i = v1; i <= v2; ++i) {
        var row = mTable.insertRow();

        // Create a cell in each row to show the multiplicand (vertical values)
        var cell = row.insertCell();
        cell.appendChild(document.createTextNode(i));
        cell.style.backgroundColor = '#4f545c';
        cell.style.color = 'orange';

        for (var j = h1; j <= h2; ++j) {
            var cell = row.insertCell();
            cell.appendChild(document.createTextNode(i * j));

            if ((i + j) % 2 == 1) {
                // Checkerboard background styling
                cell.style.backgroundColor = 'orange';
            }
        }
    }
    generated_table.appendChild(mTable);
}