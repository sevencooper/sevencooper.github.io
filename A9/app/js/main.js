/*
    Berkay Balyemez
    Berkay_Balyemez@student.uml.edu
    UMass Lowell - GUI Programming I

    Assignment 9 Javascript file
*/

/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 */
var ScrabbleTiles = [];
ScrabbleTiles["A"] = { "value": 1, "distribution": 9 };
ScrabbleTiles["B"] = { "value": 3, "distribution": 2 };
ScrabbleTiles["C"] = { "value": 3, "distribution": 2 };
ScrabbleTiles["D"] = { "value": 2, "distribution": 4 };
ScrabbleTiles["E"] = { "value": 1, "distribution": 12 };
ScrabbleTiles["F"] = { "value": 4, "distribution": 2 };
ScrabbleTiles["G"] = { "value": 2, "distribution": 3 };
ScrabbleTiles["H"] = { "value": 4, "distribution": 2 };
ScrabbleTiles["I"] = { "value": 1, "distribution": 9 };
ScrabbleTiles["J"] = { "value": 8, "distribution": 1 };
ScrabbleTiles["K"] = { "value": 5, "distribution": 1 };
ScrabbleTiles["L"] = { "value": 1, "distribution": 4 };
ScrabbleTiles["M"] = { "value": 3, "distribution": 2 };
ScrabbleTiles["N"] = { "value": 1, "distribution": 6 };
ScrabbleTiles["O"] = { "value": 1, "distribution": 8 };
ScrabbleTiles["P"] = { "value": 3, "distribution": 2 };
ScrabbleTiles["Q"] = { "value": 10, "distribution": 1 };
ScrabbleTiles["R"] = { "value": 1, "distribution": 6 };
ScrabbleTiles["S"] = { "value": 1, "distribution": 4 };
ScrabbleTiles["T"] = { "value": 1, "distribution": 6 };
ScrabbleTiles["U"] = { "value": 1, "distribution": 4 };
ScrabbleTiles["V"] = { "value": 4, "distribution": 2 };
ScrabbleTiles["W"] = { "value": 4, "distribution": 2 };
ScrabbleTiles["X"] = { "value": 8, "distribution": 1 };
ScrabbleTiles["Y"] = { "value": 4, "distribution": 2 };
ScrabbleTiles["Z"] = { "value": 10, "distribution": 1 };
ScrabbleTiles["_"] = { "value": 0, "distribution": 2 };

// Array of remaining tiles
var remainingTiles = [];

for (var key in ScrabbleTiles) {
    for (i = 0; i < ScrabbleTiles[key].distribution; ++i) {
        remainingTiles.push(key);
    }
}

// Track the score across multiple words
var totalScore = 0;
// Track the score of the current word
var letterScore = 0;
var numDoubleWord = 0;

// Dictionary of the collided tiles
var collidedTiles = {};

// Number of tiles to generate at once
const NUM_TILES = 7;


$().ready(function () {
    generateTiles();

    $("#button-submit").click(function (event) {
        totalScore += letterScore * Math.pow(2, numDoubleWord);
        generateTiles();
    });
});

function generateTiles() {
    // Reset variables
    letterScore = 0;
    numDoubleWord = 0;
    collidedTiles = {};

    // Remove the old tiles
    $("#tiles").empty();

    for (i = 0; i < NUM_TILES; ++i) {
        if (remainingTiles.length === 0) {
            break;
        }

        // Generate a random index
        var index = Math.floor(Math.random() * remainingTiles.length);
        var letter = remainingTiles[index];
        // Remove the letter
        remainingTiles.splice(index, 1);

        var id = generateTile(i, letter);
        $("#" + id).css({
            'top': $("#tile-holder").position().top - ($("#" + id).height() * i) + 5,
            'left': $("#tile-holder").position().left + (80 * i) + 300 // 72 is the width of a tile
        });
        $("#" + id).draggable({
            snap: ".snaptarget",
            stop: onTileStopped
        });
    }
}

function generateTile(id, letter) {
    var tileCSS = 'style="top:0;bottom:0;left:0;right:0;"';
    // Used to identify the letter
    var key = 'key="' + letter + '"';
    var tileHtml = '<div ' + tileCSS + key + 'id="tile-' + id + '" class="tile tile-img"><img class="tile-img" src="images/tiles/Scrabble_Tile_' + letter + '.jpg" alt="' + letter + '"></div>';
    $("#tiles").append(tileHtml);

    return "tile-" + id;
}

function onTileStopped(event, ui) {
    var tile = $("#" + event.target.id);
    var key = tile.attr("key");
    var position = tile.position();

    var collisionClass = checkForCollision(position);
    var prevCollision = collidedTiles[event.target.id];
    var tileValue = ScrabbleTiles[key].value;

    // Clear old score from this tile
    if (prevCollision === "default") {
        letterScore -= tileValue;
    } else if (prevCollision === "double-letter") {
        letterScore -= 2 * tileValue;
    } else if (prevCollision === "double-word") {
        letterScore -= tileValue;
        numDoubleWord--;
    }

    // Re-calculate score for the tile's new position
    if (collisionClass === "default") {
        collidedTiles[event.target.id] = collisionClass;
        letterScore += tileValue;
    } else if (collisionClass === "double-letter") {
        collidedTiles[event.target.id] = collisionClass;
        letterScore += 2 * tileValue;
    } else if (collisionClass === "double-word") {
        collidedTiles[event.target.id] = collisionClass;
        letterScore += tileValue;
        numDoubleWord++;
    } else {
        delete collidedTiles[event.target.id];
    }

    updateScoreInDom();
}

function checkForCollision(position) {
    var returnVal = "";

    $(".snaptarget").each(function (i) {
        // Within 1 pixel? of the tiles dropped position
        if (Math.abs(position.top - this.y) <= 1 && Math.abs(position.left - this.x) <= 1) {
            // Return the type board piece that is collided with
            returnVal = this.classList[1];
            return false; // Break the for-each loop
        }
    });
    // Not colliding with any board piece
    return returnVal;
}

function updateScoreInDom() {
    var calculatedScore = letterScore * Math.pow(2, numDoubleWord);
    var combinedScore = parseInt(totalScore) + calculatedScore;
    $("#score").html("Score: " + combinedScore);
}