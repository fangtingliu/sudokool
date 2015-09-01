(function() {

  App.BoardPresenter = function(element) {

    $view = $(element);

    $view.on('change', '.cell', function(){
      var rowIndex = $(this).closest('tr').data('row');
      var colIndex = $(this).closest('td').data('col');
      Board.update(rowIndex, colIndex, $(this).val());
    });

    this.render = function(){
      $('div.signin').hide();
      $('div.signup').hide();
      $view.html(Board.data.map(rowView));
    };

    this.render();
  };


  function rowView (row, i) {
    var $ele = $('<tr>').data('row', i);
    if (Math.floor(i/3) % 2 === 0) {
      $ele.addClass('cornerRow');
    } else {
      $ele.addClass('centerRow');
    }
    return $ele.append( row.map(colView) );
  };

  function colView (col, i) {
    var $ele = $('<td>').addClass(i).attr('id', 'col' + i);
    $ele.data('col', i);
    if (Math.floor(i/3) % 2 === 0) {
      $ele.addClass('cornerCol');
    } else {
      $ele.addClass('centerCol');
    }
    
    if (col === ' ') {
      var $select = $('<select class="cell">');
      $select.append($('<option>').val(''));
      for (var i = 1; i < 10; i ++) {
        $select.append(
          $('<option></option>').val(i).text(i)
          );
      }
      return $ele.append($select);
    } else {
      return $ele.text(col);
    }
  }  

})();
