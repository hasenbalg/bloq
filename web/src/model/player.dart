import 'dart:html';

class Player {
  var name = 'XXX';
  var score = 0;
  var highscore = 0;

  static Player _player;

  Player();

  static Player getInstance() {
    _player ??= Player();
    return _player;
  }

  void setScore(points) {
    if (points > highscore) {
      highscore = points;
    }
    score = points;
  }

  void checkHighscore() {
    if (score > highscore) {
      highscore = score;
    }
  }

  void save() {
    window.localStorage['name'] = name;
    window.localStorage['highscore'] = highscore.toString();
  }

  void restore() {
    print('restoring');
    name = window.localStorage['name'] ?? 'XXX';
    highscore = (window.localStorage['highscore'] ?? 0) as num;
  }

  void delete() {
    window.localStorage.clear();
  }
}
