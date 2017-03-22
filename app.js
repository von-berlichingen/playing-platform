(function(document) {
  var container = document.getElementById("container");

  document.getElementById('display-scores').addEventListener ("click", getScores, false);


  /////////////////////

  function getScores() {
    document.getElementById("content").setAttribute('style', 'display: flex;');

    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    fetch('http://cdn.55labs.com/demo/api.json')
      .then(function(response) {
        response
          .json()
          .then(requestData);
      });
  }

  function requestData(data) {
    var vm = data.data.DAILY;
    var settings = data.settings;

    Object.keys(vm.dataByMember.players).map(function(playerName) {
      var player = vm.dataByMember.players[playerName];
      var playerStatDiv = document.createElement('div');
      var barDiv = document.createElement('div');

      playerStatDiv.classList.add('player-stat');
      barDiv.classList.add('bar');
      playerStatDiv.appendChild(barDiv);

      vm.dates.map(function(date, index) {
        if (date) {
          var date = parseInt(vm.dates[index]);
          var detail = {
            fullname: settings.dictionary[playerName].firstname + ' ' + settings.dictionary[playerName].firstname,
            date: new Date(date),
            score: player.points[index]
          }
          barDiv.appendChild(createBarChart(detail));
        }
      });
      container.appendChild(playerStatDiv);
    });
  }

  function createBarChart(settings) {
    var newBar = document.createElement('div');

    newBar.dataset.score = settings.score;
    newBar.dataset.percentage = Math.ceil(settings.score * 0.1);
    newBar.classList.add('bar-inner');
    newBar.setAttribute('style', 'height:' + Math.ceil(settings.score * 0.1) + '%;');
    newBar.addEventListener ("click", function() {showScoreDetails(settings)}, false);

    return newBar;
  }

  function showScoreDetails(arg) {
    var scoreContainer = document.getElementById('score-info');
    var scoreDetail = '';

    while (scoreContainer.hasChildNodes()) {
      scoreContainer.removeChild(scoreContainer.firstChild);
    }

    scoreDetail = '<div>' + arg.fullname + '</div>'+
      '<div>' + arg.score + '</div>'+
      '<div>' + arg.date + '</div>';
    scoreContainer.innerHTML += scoreDetail;
  }
})(document);
