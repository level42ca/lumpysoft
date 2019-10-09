const ddbutton = document.querySelector('#dropdown-button');
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
  ddbutton.addEventListener('click', () => subMenu.style.display = 'block');
  console.log("tRUE")
  subMenuItem.forEach(item => {
    item.addEventListener('click', () => {
      let {
        value
      } = item.attributes.value;
      ddbutton.innerHTML = `${item.innerText} <i class="fal fa-${value}">`;
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
  let type = ddbutton.innerText;
  let query = searchBox.value;
  let commonToAll = `
    -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)
    -inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|wallywashis)
    intitle:\"index.of./\"
  `;

  const extensions = {
    'Video': '(avi|mkv|mov|mp4|mpg|wmv)',
    'Audio': '(ac3|flac|m4a|mp3|ogg|wav|wma)',
    'Ebook': '(CBZ|CBR|CHM|DOC|DOCX|EPUB|MOBI|ODT|PDF|RTF|FB2|LIT|LRF|PRC|PDB|PML|RB|TCR|CBC|txt)',
    'Pictures': '(bmp|gif|jpg|png|psd|tif|tiff)',
    'Software/Games': '(apk|exe|ipa|iso|rar|tar|zip)',
    'Compressed': '(apk|exe|iso|rar|tar|zip|7z)'
  }

  let searchTerms = query.split(',');
  searchTerms = searchTerms.map(term => `intext:"${term.trim()}"`).join(' ');

  let finalquery = `${searchTerms} ${extensions[type]} ${commonToAll}`;

  let url = `https://www.google.com/search?q=${encodeURIComponent(finalquery)}`;

  window.open(url, '_blank');
}
