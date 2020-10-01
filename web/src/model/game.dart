import 'dart:html';

import '../Screens/game_over_screen.dart';
import 'board.dart';
import 'color.dart';
import 'field.dart';
import 'score_board.dart';
import 'shape.dart';
import 'shop.dart';

class Game {
  CanvasElement canvas;
  CanvasRenderingContext2D context;
  int width;
  int height;
  Board board;
  Shop shop;
  ScoreBoard scoreBoard;

  Shape currentShape;

  bool isOver = false;

  Game({this.canvas}) {
    context = canvas.context2D;
    width = canvas.width;
    height = canvas.height;
    board = Board();
    shop = Shop();
    scoreBoard = ScoreBoard();

    currentShape = Shape();
    canvas.style.background = Color.backgroundColor.toString();

    canvas.addEventListener('touchstart', (event) {
      event.preventDefault();
      var t = Point((event as TouchEvent).targetTouches.first.screen.x,
          (event as TouchEvent).targetTouches.first.screen.y);
      shop.touchStart(t);
    });
  }

  void update() {
    board.update();
    shop.update();
    scoreBoard.update();
  }

  void render() {
    context.clearRect(0, 0, width, height);
    board.render();
    shop.render();
    scoreBoard.render();
  }

  void resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.width -= 4;
    canvas.height -= 4;
    width = canvas.width;
    height = canvas.height;
  }

  void drawFrame(int x, int y, num width, num height, Color color) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.lineWidth = 1;
    context.strokeStyle = Color;
    context.stroke();
  }

  void drawRect(num x, num y, num width, num height, String string) {}

  num getSegemetEdgeLength() {
    return board.segmentEdgeLength;
  }

  void checkGameOver() {
    for (var shape in shop.availableShapes) {
      var possiblePositions = board.findPossiblePositions(shape);
      var positionsCounter = 0;
      for (var row in possiblePositions) {
        for (var field in row) {
          if (field == FieldState.SHAPEOKHERE) {
            positionsCounter++;
          }
        }
      }
      if (positionsCounter == 0) {
        shape.isActive = false;
      } else {
        shape.isActive = true;
      }
    }

    //check if there are still active shapes available

    if (shop.availableShapes.where((as) => as.isActive).isEmpty &&
        shop.availableShapes.isEmpty) {
      isOver = true;
      print('GAME OVER');
      GameOverScreen(canvas: canvas);
    }
  }

  void resetCurrentShape(bool thereWasChange) {}
}
