(function(){
  App.SubmitPresenter = function(ele){
    var $view = $(ele);

    $view.on('click', function(){
      var board = Board.data;
      var res = 'solved';

      // check row and col
      for (var r = 0; r < board.length; r ++) {
        var rObj = {}, cObj = {};
        for (var c = 0; c < board[r].length; c ++) {
          !rObj[board[r][c]] ? rObj[board[r][c]] = 1 : res = 'invalid';
          !cObj[board[c][r]] ? cObj[board[c][r]] = 1 : res = 'invalid';
        }  
      }
      // check subgrid
      for (var i = 0; i < 3; i ++) {
        for (var j = 0; j < 3; j ++) {
          var sObj = {};
          for (var r = i*3; r < i*3 + 3; r ++) {
            for (var c = j*3; c < j*3 + 3; c ++) {
              !sObj[board[r][c]] ? sObj[board[r][c]] = 1 : res = 'invalid';
            }
          }
        }
      }
      console.log('res', res)
      App.SubmitPresenter.render(res);
      
    });

    App.SubmitPresenter.render = function(res){
      $('div.result').empty();
      console.log($view.find('div.result'))
      $('div.result').text(resultView(res));
    };
  }

  function resultView(res){
    if (res === 'solved') {
      return 'Congradulations! You solved it.';
    } else {
      return 'Try again!';
    }
  }

})();