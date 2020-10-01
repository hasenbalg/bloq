import 'dart:html';

import '../model/game.dart';
import '../model/player.dart';

class GameOverScreen {
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  bool debug;
  num width, height;
  var player;

  var text = 'GAME OVER';

  GameOverScreen({this.canvas}) {
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    debug = false;
    player = Player.getInstance();

    if (player.score == player.highscore) {
      text = '''Super gemacht,\n weiter so!
            Du hast eine neue\n Hoechstleistung\n vollbracht\n
            ${player.highscore}''';
    } else {
      text += '''\nSchade\n
            ${player.score} | ${player.highscore}''';
    }

    canvas.addEventListener('touchstart', (Event e) {
      e.target.removeEventListener('touchstart', (_) => _);
      Game(canvas: canvas);
    });
    player.save();
    player.score = 0;
  }

  void update() {}

  void render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '30pt Gilbert';
    var lineheight = 30;
    var lines = text.split('\n');
    context.fillStyle = '#222';
    context.textAlign = 'center';
    for (var i = 0; i < lines.length; i++) {
      context.fillText(
          lines[i].trim(), width / 2, height / 2 + (i * lineheight));
      //this._context.fillText(this._text, this._width / 2, this._height / 2);
    }
  }

  void resize() {}
}
