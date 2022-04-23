import 'package:bloq/src/model/board.dart';
import 'package:bloq/src/model/shape.dart';
import 'package:bloq/src/model/shop.dart';

class Game {
  int highscore = 0;

  late final Board board;
  late final Shop shop;

  Game() {
    board = Board(9, 9);
    shop = Shop();
  }

  void fitPeace(Shape s, int x, int y) {
    if (!board.willShapeFit(s, x, y)) {
      s.goHome();
    }
  }

  void update() {}

  void render() {}
}
