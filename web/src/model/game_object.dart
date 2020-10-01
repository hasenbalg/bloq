import 'game.dart';

class GameObject {
  Game game;
  num x, y, width, height;

  GameObject({
    this.game,
    this.x = 0,
    this.y = 0,
    this.width = 0,
    this.height = 0,
  });

  void update() {}

  void render() {}
}
