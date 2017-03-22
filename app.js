(function(document) {
  var container = document.getElementById("container");
  var scoreInfo = document.getElementById('score-info');

  document.getElementById('display-scores').addEventListener ("click", getScores, false);


  /////////////////////

  function getScores() {
    document.getElementById("content").setAttribute('style', 'display: flex;');

    container = refreshElement(container);
    scoreInfo = refreshElement(scoreInfo);

    scoreInfo.appendChild(document.createTextNode('Select a bar to see the score details.'));

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
            fullname: settings.dictionary[playerName].firstname + ' ' + settings.dictionary[playerName].lastname,
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

    scoreContainer = refreshElement(scoreContainer);

    scoreDetail = '<div class="score-info__element"><span>Player name: </span>' + arg.fullname + '</div>'+
      '<div class="score-info__element"><span>Score: </span>' + arg.score + '</div>'+
      '<div class="score-info__element"><span>Date: </span>' + arg.date.strftime('%F') + '</div>'+
      '<div class="score-info__element"><span>Time: </span>' + arg.date.strftime('%T') + '</div>';
    scoreContainer.innerHTML += scoreDetail;
  }

  function refreshElement(element) {
    if (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
      return refreshElement(element);
    } else {
      return element;
    }
  }
})(document);
