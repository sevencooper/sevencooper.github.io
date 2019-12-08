/*
    Berkay Balyemez
    Berkay_Balyemez@student.uml.edu
    UMass Lowell - GUI Programming I

    Assignment 8 Javascript file
*/

$().ready(function () {
    var horz1 = $('#input_horz1');
    var horz2 = $('#input_horz2');
    var vert1 = $('#input_vert1');
    var vert2 = $('#input_vert2');

    var horz1Slider = $('#horz1_slider');
    var horz2Slider = $('#horz2_slider');
    var vert1Slider = $('#vert1_slider');
    var vert2Slider = $('#vert2_slider');

    function bindSliderAndInputField(id, value) {
        if (id.includes("horz1")) {
            horz1.val(value);
            horz1Slider.slider('value', value);
        } else if (id.includes("horz2")) {
            horz2.val(value);
            horz2Slider.slider('value', value);
        } else if (id.includes("vert1")) {
            vert1.val(value);
            vert1Slider.slider('value', value);
        } else if (id.includes("vert2")) {
            vert2.val(value);
            vert2Slider.slider('value', value);
        }
    }

    $('.input_field').on('change', function (event) {
        bindSliderAndInputField(event.target.id, $(event.target.id).val());
    });

    $('.input_slider').slider({
        min: -50,
        max: 50,
        change: function (event, ui) {
            bindSliderAndInputField(event.target.id, ui.value);
        }
    });

    var button_generate = document.getElementById('button_generate');
    var generated_table = document.getElementById('generated_table');

    // Custom validation method
    jQuery.validator.addMethod("validNumber", function (val, element) {
        return this.optional(element) || isValidNumber(val);
    }, "Enter an integer between -50 and 50");

    var validator = $("#input_form").validate({

        rules: {
            errorClass: "validation-error",
            input_horz1: {
                required: true,
                validNumber: true
            },
            input_horz2: {
                required: true,
                validNumber: true
            },
            input_vert1: {
                required: true,
                validNumber: true
            },
            input_vert2: {
                required: true,
                validNumber: true
            }
        }
    });

    button_generate.onclick = function () {
        if (!$("#input_form").valid()) {
            // Move the focus to the invalid input fields
            validator.focusInvalid();
            return;
        }

        var horz1_val = horz1.val();
        var horz2_val = horz2.val();
        var vert1_val = vert1.val();
        var vert2_val = vert2.val();

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
    };

    function isValidNumber(value) {
        // True if number between -50 and 50
        // Letter e is for exponentials; consider it invalid
        if (isNaN(value) || value === "" || value.includes('.') || value.includes('e') || value.includes('E') || value < -50 || value > 50) {
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

                if ((Math.abs(i) + Math.abs(j)) % 2 == 1) {
                    // Checkerboard background styling
                    cell.style.backgroundColor = 'orange';
                }
            }
        }
        generated_table.appendChild(mTable);
    }
});