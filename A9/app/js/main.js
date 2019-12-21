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
ScrabbleTiles["A"] = { "value": 1, "original-distribution": 9, "number-remaining": 9 };
ScrabbleTiles["B"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["C"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["D"] = { "value": 2, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["E"] = { "value": 1, "original-distribution": 12, "number-remaining": 12 };
ScrabbleTiles["F"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["G"] = { "value": 2, "original-distribution": 3, "number-remaining": 3 };
ScrabbleTiles["H"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["I"] = { "value": 1, "original-distribution": 9, "number-remaining": 9 };
ScrabbleTiles["J"] = { "value": 8, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["K"] = { "value": 5, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["L"] = { "value": 1, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["M"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["N"] = { "value": 1, "original-distribution": 6, "number-remaining": 6 };
ScrabbleTiles["O"] = { "value": 1, "original-distribution": 8, "number-remaining": 8 };
ScrabbleTiles["P"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["Q"] = { "value": 10, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["R"] = { "value": 1, "original-distribution": 6, "number-remaining": 6 };
ScrabbleTiles["S"] = { "value": 1, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["T"] = { "value": 1, "original-distribution": 6, "number-remaining": 6 };
ScrabbleTiles["U"] = { "value": 1, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["V"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["W"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["X"] = { "value": 8, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["Y"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["Z"] = { "value": 10, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["_"] = { "value": 0, "original-distribution": 2, "number-remaining": 2 };

// Tile array
var tiles;

// Track the score across multiple words
var totalScore = 0;
// Track the score of the current word
var letterScore = 0;
var numDoubleWord = 0;
var numDoubleLetter = 0;

// Map of the collided tiles
const collidedTiles = new Object();

// Number of tiles to generate at once
const NUM_TILES = 15;


$().ready(function () {
    generateTiles();
});

function generateTiles() {
    // Remove the old tiles
    $("#tiles").empty();

    // Clear tiles array
    tiles = [];

    for (i = 0; i < NUM_TILES; ++i) {
        tiles[i] = generateTile(i, 'Q');
        $("#" + tiles[i]).css({
            'top': $("#tile-holder").position().top - ($("#" + tiles[i]).height() * i) + 5,
            'left': $("#tile-holder").position().left + (74 * i) // 72 is the width of a tile
        });
        $("#" + tiles[i]).draggable({
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

    if (collisionClass === "default") {
        if (collidedTiles.has(event.target.id)) {*
            // score -= ...
        } else {
            collidedTiles.set(event.target.id, collisionClass);
            // score += ...
        }
    } else if (collisionClass === "double-letter") {
        if (collidedTiles.has(event.target.id)) {
            // score -= ...
        } else {
            collidedTiles.set(event.target.id, collisionClass);
            // score += ...
        }
    } else if (collisionClass === "double-word") {
        if (collidedTiles.has(event.target.id)) {
            // score -= ...
        } else {
            collidedTiles.set(event.target.id, collisionClass);
            // score += ...
        }
    } else {
        if (collidedTiles.has(event.target.id)) {
            // score -= ...
        }
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

function updateCurrentScoreValues() {

}

function updateScoreInDom() {

}