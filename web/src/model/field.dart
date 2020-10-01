import 'color.dart';
import 'game.dart';
import 'game_object.dart';

class Field extends GameObject {
  num VANISHING_SPEED = .01;

  @override
  Game game;
  @override
  num x, y, width, height;
  Color color;
  FieldState status;

  Field({
    this.game,
    this.x,
    this.y,
    this.width,
    this.height,
  }) : super(game: game) {
    color = Color.white;
    status = FieldState.FREE;
  }

  @override
  void update() {
    if (status == FieldState.VANISHING) {
      status = FieldState.FREE;
    }
  }

  @override
  void render() {
    switch (status) {
      case FieldState.FREE:
        return;
      case FieldState.RESERVED:
        color.makeTransparent(.4);
        break;
      case FieldState.OCCUPIED:
        color.makeOpaque();
        break;
      default:
        break;
    }
    game.drawRect(x, y, width, height, color.toString());
  }
}

enum FieldState { FREE, RESERVED, OCCUPIED, SHAPEOKHERE, VANISHING }
