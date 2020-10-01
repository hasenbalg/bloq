import 'dart:math';

import 'color.dart';
import 'field.dart';
import 'game.dart';
import 'player.dart';
import 'shape.dart';

class Board {
  static int BLOCKS_IN_A_ROW = 9;
  static int MARGIN = 5;

  static int SNAPDISTANCE = 5;

  Game game;
  num segmentEdgeLength;
  num width;
  List<List<Field>> matrix;
  String currentColor;

  Board({this.game}) {
    segmentEdgeLength = (game.width - MARGIN * 2) / BLOCKS_IN_A_ROW;
    width = game.width - MARGIN * 2;

    matrix = _getEmptyMatrix();
  }

  void update() {
    matrix.expand((line) => line).toList().forEach((field) => field.update());
  }

  void render() {
    game.drawFrame(MARGIN, MARGIN, width, width, Color.boardColor);
    matrix.expand((line) => line).toList().forEach((field) => field.render());
  }

  List<List<Field>> _getEmptyMatrix() {
    return List.generate(
        width,
        (y) => List.generate(
            width,
            (x) => Field(
                x: (x * segmentEdgeLength) + MARGIN,
                y: (y * segmentEdgeLength) * MARGIN),
            growable: false),
        growable: false);
  }

  void reserve(Shape shape) {
    // touch is in board boundries
    if (shape.position.x - MARGIN > MARGIN &&
        shape.position.y - MARGIN > MARGIN &&
        shape.position.x < game.width - MARGIN &&
        shape.position.y < game.width + MARGIN) {
      // generate a new board with the old occupations
      var newMatrix = _getEmptyMatrix();
      //remove reservations
      for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x].status == FieldState.RESERVED) {
            matrix[y][x].status = FieldState.FREE;
          }
          newMatrix[y][x] = matrix[y][x];
        }
      }

      var topLeftField = Point(0, 0);

      //get possible positions
      var possiblePositions = findPossiblePositions(shape);
      var shortestDistance = 99999999999999;
      for (var y = 0; y < possiblePositions.length; y++) {
        for (var x = 0; x < possiblePositions[y].length; x++) {
          if (FieldState.SHAPEOKHERE == possiblePositions[y][x]) {
            var currentDistance = _getDistance(
                Point(x * segmentEdgeLength + MARGIN,
                    y * segmentEdgeLength + MARGIN),
                shape.position);
            if (currentDistance < shortestDistance) {
              shortestDistance = currentDistance;
              topLeftField = Point(x, y);
            }
          }
        }
      }

      if (shortestDistance > SNAPDISTANCE) {
        return;
      }

      for (var y = 0; y < shape.pattern.length; y++) {
        for (var x = 0; x < shape.pattern[y].length; x++) {
          try {
            if (shape.pattern[y][x] > 0) {
              if (newMatrix[topLeftField.y + y][topLeftField.x + x].status ==
                  FieldState.FREE) {
                newMatrix[topLeftField.y + y][topLeftField.x + x].color =
                    shape.color;
                newMatrix[topLeftField.y + y][topLeftField.x + x].status =
                    FieldState.RESERVED;
              } else {
                return;
              }
            }
          } catch (error) {
            rethrow;
          }
        }
      }
      matrix = newMatrix;
    }
  }

  List<List<FieldState>> findPossiblePositions(Shape shape) {
    var possiblePositions = [];

    for (var y = 0; y < matrix.length; y++) {
      possiblePositions[y] = [];
      for (var x = 0; x < matrix[y].length; x++) {
        possiblePositions[y][x] = matrix[y][x].status;
      }
    }

    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        var shapeIsFitting = true;

        for (var sy = 0; sy < shape.pattern.length; sy++) {
          for (var sx = 0; sx < shape.pattern[sy].length; sx++) {
            if (y + sy > BLOCKS_IN_A_ROW - 1 ||
                x + sx > BLOCKS_IN_A_ROW - 1 ||
                (shape.pattern[sy][sx] == 1 &&
                    matrix[y + sy][x + sx].status == FieldState.OCCUPIED)) {
              shapeIsFitting = false;
            }
          }
        }
        if (shapeIsFitting) {
          possiblePositions[y][x] = FieldState.SHAPEOKHERE;
        }
      }
    }
    return possiblePositions;
  }

  num _getDistance(Point a, Point b) {
    var c = a.x - b.x;
    var d = a.y - b.y;

    return sqrt(c * c + d * d);
  }

  void dropShape(Shape shape) {
    // generate a new board with the old occupations
    var newMatrix = _getEmptyMatrix();
    var thereWasChange = false;
    //remove reservations
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x].status == FieldState.RESERVED) {
          thereWasChange = true;
          matrix[y][x].status = FieldState.OCCUPIED;
          matrix[y][x].color = shape.color;
        }
        newMatrix[y][x] = matrix[y][x];
      }
    }

    if (!thereWasChange) {
      //matrix did not change
      shape.invalidDrop = true;
    } else {
      //drop is successful
      matrix = newMatrix;
      _clearCompleteLines();
      Player.getInstance().score += shape.getPoints();
    }
    game.resetCurrentShape(thereWasChange);
  }

  void _clearCompleteLines() {
    var rowIndeciesToDelete = <int>[];
    // look for lines
    for (var y = 0; y < matrix.length; y++) {
      var counter =
          matrix[y].where((i) => i.status == FieldState.OCCUPIED).length;

      if (counter == BLOCKS_IN_A_ROW) {
        rowIndeciesToDelete.add(y);
      }
    }
    // look for columns

    var columnIndeciesToDelete = <int>[];
    var rotatedCcwMatrix = rotateMatrixCounterClockwise(matrix);
    for (var y = 0; y < rotatedCcwMatrix.length; y++) {
      var counter = rotatedCcwMatrix[y]
          .where((i) => i.status == FieldState.OCCUPIED)
          .length;

      if (counter == BLOCKS_IN_A_ROW) {
        columnIndeciesToDelete.add(y);
      }
    }

    // delete rows and columns

    for (var rowIndex in rowIndeciesToDelete) {
      for (var x in matrix[rowIndex]) {
        x.status = FieldState.VANISHING;
        Player.getInstance().score += 1;
      }
    }
    // rotate matrix ccw
    matrix = rotateMatrixCounterClockwise(matrix);
    for (var colIndex in columnIndeciesToDelete) {
      for (var x in matrix[colIndex]) {
        x.status = FieldState.VANISHING;
        Player.getInstance().score += 1;
      }
    }
    // rotate back cw
    matrix = rotateMatrixClockwise(matrix);
  }

  @override
  String toString() {
    var output = '';
    for (var y in matrix) {
      for (var x in y) {
        output += x.status.toString();
      }
      output += '\n';
    }
    return output;
  }

  static List<List<T>> rotateMatrixCounterClockwise<T>(List<List<T>> matrix) {
    var rotated = List.generate(matrix[0].length, (i) => List(matrix.length),
        growable: false);

    for (var i = 0; i < matrix[0].length; ++i) {
      for (var j = 0; j < matrix.length; ++j) {
        rotated[i][j] = matrix[j][matrix[0].length - i - 1];
      }
    }

    return rotated;
  }

  static List<List<T>> rotateMatrixClockwise<T>(List<List<T>> matrix) {
    var rotated = List.generate(matrix[0].length, (i) => List(matrix.length),
        growable: false);

    for (var i = 0; i < matrix[0].length; ++i) {
      for (var j = 0; j < matrix.length; ++j) {
        rotated[i][j] = matrix[matrix.length - j - 1][i];
      }
    }

    return rotated;
  }
}
