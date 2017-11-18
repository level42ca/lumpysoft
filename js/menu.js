/////////////////////////////////////////////////
//                Variables                    //
/////////////////////////////////////////////////
    var button = $('#dropdown-button')
	var subMenu = $('#dropdown-menu')
    var subMenuItem = $("#dropdown-menu li")
    var searchButton = $('#search-button')
    var searchBox = $('#search-box')
    
    
$(window).resize(function(){
	if ($(window).width() <= 750){	
		searchButton.text("Search")
        searchButton.append(' <i class="fal fa-search">'); 
	} else {
        searchButton.text("")
        searchButton.append(' <i class="fal fa-search">');
    }
});


/////////////////////////////////////////////////
//             Show Menu Toggle                //
/////////////////////////////////////////////////
$(function() {
    button.click(function() {
        subMenu.slideToggle(250, 'easeInOutQuint');
    });
});

/////////////////////////////////////////////////
//              Menu Selection                 //
/////////////////////////////////////////////////
$(function() {
    // Check which sub menu item was clicked
    subMenuItem.click(function() {
        console.log($(this).text() + " clicked");                                       // Tell me which item was clicked.
        button.text($(this).text());                                                    // Copy the text of the selected menu item to the button.
        button.append(' <i class="fal fa-' + $(this).attr("value") + '">');             // Set the icon to match the text.
        button.val($(this).text());                                                     // Set the value of the button to that of the text selected.
        subMenu.slideToggle(250, 'easeInOutQuint');                                     // Hide menu after selection is made.
    });
});

/////////////////////////////////////////////////
//       Controls Enter Key for TextBox        //
/////////////////////////////////////////////////
$(document).ready(function() {
  $('body').keypress(function(e) {
    if (e.which == 13) {
      searchButton.trigger('click');
      console.log("search button clicked");
    }
  });
});

/////////////////////////////////////////////////
//         Generates the search string         //
/////////////////////////////////////////////////
$(document).ready(function() {
  searchBox.val("");
  searchBox.focus();
    
  searchButton.click(function() {
    var type = button.val();                                                            // Set the type valriable to the value of the button.
    var query = searchBox.val();                                                        // Set the Query variable to the value of the text box.
    var arr = new Array();                                                              // Create a new blank array.
    var commonToAll = " -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) " +                  // This string is common to all searches.
        "-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wall" +
        "ywashis) intitle:\"index.of./\" ";
    if (query[query.length - 1] == ',') {                                               // Check the length of the search term to see if there were
      query = query.slice(0, -1)                                                            // multiple search terms used, then slice the string at
    }                                                                                       // every comma.
    arr = query.split(',');                                                                         
    arr.push(',');
    switch (type) {                                                                     // Compare the type that was set earlier with the cases below
      case ("Video"):
        {
          var extensions = " (avi|mkv|mov|mp4|mpg|wmv)";
          break;
        }
      case ("Audio"):
        {
          var extensions = " (ac3|flac|m4a|mp3|ogg|wav|wma) ";
          break;
        }
      case ("Ebook"):
        {
          var extensions = " (CBZ|CBR|CHM|DOC|DOCX|EPUB|MOBI|ODT|PDF|RTF|txt)";
          break;
        }
      case ("Pictures"):
        {
          var extensions = " (bmp|gif|jpg|png|psd|tif|tiff) ";
          break;
        }
      case ("Software/Games"):
        {
          var extensions = " (apk|exe|iso|rar|tar|zip) ";
          break;
        }
      case ("Compressed"):
        {
          var extensions = " (7z|bz2|gz|iso|rar|zip) ";
          break;
        }
      default:
        {
          var extensions = " (avi|mkv|mov|mp4|mpg|wmv)";
          break;
        }
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

        var url = "https://www.google.com/search?q=" + encodeURIComponent(finalquery);
        //alert(goodinput);
        window.open(url, '_blank');
      }

    }
  });
});
