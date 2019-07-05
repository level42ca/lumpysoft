const button = document.querySelector('#dropdown-button');
const subMenu = document.querySelector('#dropdown-menu');
const subMenuItem = document.querySelectorAll('#dropdown-menu li');
const searchButton = document.querySelector('#search-button');
const searchBox = document.querySelector('#search-box');

window.addEventListener('resize', () => {    
	if (window.innerWidth <= 750) {	
		searchButton.innerHTML = 'Search <i class="fal fa-search">';
	} else {
    searchButton.innerHTML = '<i class="fal fa-search">';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  button.addEventListener('click', () => subMenu.style.display = 'block');

  subMenuItem.forEach(item => {
    item.addEventListener('click', () => {
      let { value } = item.attributes.value;
      button.innerHTML = `${item.innerText} <i class="fal fa-${value}">`;
      subMenu.style.display = 'none';
    });
  });
  
  searchButton.addEventListener('click', search);
  document.addEventListener('keyup', e => {
    if (e.which == 13) search();
  });

  searchBox.focus();
  
});

function search() {
	let type = button.innerText;                                                            // Set the type variable to the value of the button.
  let query = searchBox.value;                                                            // Create a new blank array.
  let commonToAll = " -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) " +                  // This string is common to all searches.
      "-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wall" +
      "ywashis) intitle:\"index.of./\" ";

  if (query[query.length - 1] == ',') {                                               // Check the length of the search term to see if there were
    query = query.slice(0, -1)                                                            // multiple search terms used, then slice the string at
  }    
                                                                                     // every comma.
  let arr = query.split(',');                                                                         
  arr.push(',');
  
  switch (type) {                                                                     // Compare the type that was set earlier with the cases below
    case ("Video"):
      var extensions = " (avi|mkv|mov|mp4|mpg|wmv)";
      break;
    case ("Audio"):
      var extensions = " (ac3|flac|m4a|mp3|ogg|wav|wma) ";
      break;
    case ("Ebook"):
      var extensions = " (CBZ|CBR|CHM|DOC|DOCX|EPUB|MOBI|ODT|PDF|RTF|txt)";
      break;
    case ("Pictures"):
      var extensions = " (bmp|gif|jpg|png|psd|tif|tiff) ";
      break;
    case ("Software/Games"):
      var extensions = " (apk|exe|iso|rar|tar|zip) ";
      break;
    case ("Compressed"):
      var extensions = " (7z|bz2|gz|iso|rar|zip) ";
      break;
    default:
      var extensions = " (avi|mkv|mov|mp4|mpg|wmv)";
      break;
  }

  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] != "") {
      var temp = arr[i];
      var last;
      temp = temp.replace(/[^\w\s]/gi, '');
      if (temp != 0) {
        last = temp.replace(/ /g, ".");
      }
      var goodinput = "intext:\"" + last + "\"";
      var finalquery = goodinput + extensions + commonToAll;

      var url = `https://www.google.com/search?q=${encodeURIComponent(finalquery)}`;

      window.open(url, '_blank');
    }
  }
}