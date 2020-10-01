import 'dart:html';

import '../../main.dart';
import '../model/game.dart';
import '../model/player.dart';

class StartScreen {
  CanvasElement canvas;
  var context;
  var debug;
  var width;
  var height;

  var text = 'TAP TO START!';

  var numFlagsInRow = 8;

  StartScreen({this.canvas}) {
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    resize();
    debug = false;

    var player = Player.getInstance();
    player.restore();

    canvas.addEventListener('touchstart', (Event e) {
      e.target.removeEventListener('touchstart', (_) {});
      currentScreen = Game(canvas: canvas);
    });
  }

  void update() {}

  void render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '30pt Gilbert';
    context.fillStyle = '#222';
    context.textAlign = 'center';
    context.fillText(text, width / 2, height / 2);
  }

  void resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.width -= 4;
    canvas.height -= 4;
    width = canvas.width;
    height = canvas.height;
  }
}
