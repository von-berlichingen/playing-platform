(function(document) {
  var htmlElements = "";
  var container = document.getElementById("player");

  fetch('http://cdn.55labs.com/demo/api.json')
    .then(function(response) {
      response.json()
      .then(function(data) {
        var vm = data.data.DAILY;
        Object.keys(vm.dataByMember.players).map(function(playerName) {
          var player = vm.dataByMember.players[playerName];
          htmlElements += '<div class="player-stat"><div class="bar">';
          vm.dates.map(function(date, index) {
            if (date) {
              var percentage = Math.ceil(player.points[index] * 0.1);
              htmlElements += '<div class="bar-inner" id="barInner" data-player=' + playerName +
                                ' data-score =' + player.points[index] +
                                ' data-percent=' + percentage + '%></div>';
            }
          });
          htmlElements += '</div><div class="bar-title">' + playerName+ '</div></div>';
          container.innerHTML += htmlElements;
          animateBars();
          htmlElements = "";
        });
      });
    });


/////////////////////

  function animateBars() {
    var _bars = [].slice.call(document.querySelectorAll('.bar-inner'));
    _bars.map(function(bar) {
      bar.addEventListener ("click", showScoreDetails, false)
      bar.style.height = bar.dataset.percent;
    });
  }

  function showScoreDetails(e) {
    var selectedScoreInfo = {
      player: e.target.dataset.player,
      score: e.target.dataset.score
    }
    console.log(selectedScoreInfo);
  }

})(document);
