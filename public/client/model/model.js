(function() {
  var board = ["8    6371",
             "16 3 78  ",
             "   41    ",
             "     2 58",
             "4 18 37 9",
             "28 1     ",
             "    549  ",
             "  72 9 64",
             "9456    7"];

  for (var row = 0; row < 9; row ++) {
    board[row] = board[row].split('');
  };

  // var moves = [], if i wanna store each move

  window.Board = {
    data: board.slice(),

    update: function (x, y, value) {
       Board.data[x][y] = value;
       console.log(Board);
    },

    map: function(cb) {
      return board.map(cb);
    }
  }


})();