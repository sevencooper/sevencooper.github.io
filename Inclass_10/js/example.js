// ADD NEW ITEM TO END OF LIST
document.getElementById('four').after(createListItem('cream'));

// ADD NEW ITEM START OF LIST
var firstListItem = document.getElementById('one');
firstListItem.before(createListItem('kale'));

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var allListItems = document.getElementsByTagName('li');

for (var i = 0; i < allListItems.length; ++i) {
    allListItems[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
document.getElementsByTagName('h2')[0].innerHTML += '<span>' + allListItems.length + '</span>'

function createListItem(text) {
    document.createElement('li');
    var listItem = document.createElement('li');
    listItem.textContent = text;

    return listItem;
}