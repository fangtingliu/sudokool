  // // view
  // var $view = $('#app table tbody');
(function(){
  window.App = {
    pubsub: null,
  };

  App.init = function() {
    //console.log(board)
    App.BoardPresenter('#app table tbody');
    App.SubmitPresenter('button.submit');
  }

})();