(function(){

  /*** init variables ***/ 

  var colors = ['blue','green','orange'],
      minRowCols = 4,
      maxRowCols = 6,
      recursionChance = 0.2,
      recursionDepreciationRate = 0.05,
      styleChance = 0.3;
  		$button = $('button');

  
  /*** helper functions ***/ 

  // returns table with # of rows & columns between min & max
  var generateMondrianTable = function(min, max, chance){      
    var numRows = Math.floor(Math.random() * (max + 1 - min) + min);
    var numCols = Math.floor(Math.random() * (max + 1 - min) + min);

    // create this table
    var $thisTable = $('<table border="0" cellpadding="0" cellspacing="0">');

    // append rows to this table
    for ( var i = 0; i < numRows; i++ ) {
      $thisTable.append('<tr></tr>');
    }

    // append cells to each of this table's rows
    $thisTable.find('tr').each(function(){
      for ( var j = 0; j < numCols; j++ ) {
        $(this).append('<td> </td>');
      }
    });  

    // for each lucky cell, generate a new table
    $thisTable.find('td').each(function(){
      var feelingLucky = (Math.random() < chance) ? true : false;

      if ( feelingLucky ) {
        var newerTable = generateMondrianTable(1, 3, chance * recursionDepreciationRate);
        $(this).append(newerTable)
        .css({
          'border' : 'none'
        });
      }
    });

    return $thisTable;
  };

  // returns a background color, mostly white
  var getCellBackgroundColor = function(){
    var setToPrimaryColors = (Math.random() < styleChance) ? true : false;
    var bgColor;

    // set random background color or white
    if ( setToPrimaryColors ) {
      bgColor = colors[Math.floor(Math.random() * (colors.length + 1))]; 
    }
    else {
      bgColor = 'white';
    }

    return bgColor;
  };

  // returns a percentage between 0 and 100 if it has a chance
  var getRandomPercentage = function(){
    var setToPercentage = (Math.random() < styleChance) ? true : false;
    var percentage;

    if ( setToPercentage ) {
      percentage = Math.floor(Math.random() * (100 + 1));
    }
    else {
      percentage = '100';
    }

    return percentage;
  };


  /*** let's make some friggin art ***/

  // get the "frame"
  var $frame = $('.frame');

  // paint in each "frame"
  $frame.each(function(){

    var $thisFrame = $(this)

    // generate initial table
    var newTable = generateMondrianTable(minRowCols, maxRowCols, recursionChance);
    $thisFrame.append(newTable);

    // randomize cell styling
    $thisFrame.find('td').each(function(){
      $(this).css({
        'background-color' : getCellBackgroundColor(), 
      });   
    });

    // randomize row sizes 
    $thisFrame.find('> tr').each(function(){
      $(this).css({ 
        'height' : getRandomPercentage() + '%' 
      }); 
    });
  });
  
})();