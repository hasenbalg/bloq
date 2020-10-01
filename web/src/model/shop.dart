import 'dart:math';

import 'color.dart';
import 'game.dart';
import 'shape.dart';

class Shop {
  num NUM_AVAILABLE_SHAPES;
  List<Shape> availableShapes, possibleShapes;
  num leftOffset;

  Game game;

  Shop({this.game}) {
    possibleShapes = [];
    _iniShapes();
    availableShapes = [];
    leftOffset = game.width / NUM_AVAILABLE_SHAPES + 2;
  }

  void touchStart(Point<num> t) {}

  void update() {
    if (availableShapes.isEmpty) {
      _fillShop();
    }
    availableShapes.forEach((s) {
      s.update();
      //dont render if over board
      s.isOverShop = _checkIfOverShop(s);
    });
  }

  void render() {
    availableShapes.forEach((s) => s.render());
  }

  void _iniShapes() {
    // var possibleShapes = [];
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.EMPTY,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.L,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.TRI,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.QUAD,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.BAR3HORIZONTAL,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.BAR3VERTICAL,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.J,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.FLASH,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.Z,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.G,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
    possibleShapes.add(Shape(
      game: game,
      pattern: Shape.DOT,
      position: Point(0, 0),
      color: Color(r: 0, g: 0, b: 0, a: 0),
    ));
  }

  void _fillShop() {
    availableShapes = <Shape>[];
    for (var i = 0; i < NUM_AVAILABLE_SHAPES; i++) {
      var random = Random().nextInt(possibleShapes.length);
      availableShapes[i] = Shape.getClone(
          possibleShapes[random],
          Point(
            (game.width / NUM_AVAILABLE_SHAPES * i) + leftOffset,
            (game.height - (game.height - game.width) / 2),
          ));
    }
    game.checkGameOver();
  }

  bool _checkIfOverShop(Shape shape) {
    return (shape.position.y > game.width);
  }
}
