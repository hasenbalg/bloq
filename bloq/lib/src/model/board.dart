import 'package:bloq/src/model/shape.dart';
import 'package:meta/meta.dart';
import 'package:vector_math/vector_math_64.dart';

class Board {
  late final int width, height;
  late final List<List<int>> fields;
  Shape? _activeShape;
  List<Vector2> possiblePositions = [];

  Board(this.width, this.height) {
    fields = List.generate(width, (i) => List.generate(height, (j) => 0));
  }
  Board.fromFields(this.fields) {
    width = fields.length;
    height = fields.first.length;
  }

  bool get hasActiveShape => _activeShape != null;

  Shape? returnActiveShape() {
    Shape? res = hasActiveShape?Shape(_activeShape!.fields);
    _activeShape = null;
    tidyUp();
    return res;
  }

  set activeShape(Shape? activeShape) {
    if (activeShape == null) {
      _activeShape = null;
      possiblePositions = [];
      return;
    }
    // check if shape will fit anywhere
    for (var y = 0; y < fields.length; y++) {
      for (var x = 0; x < fields[y].length; x++) {
        if (willShapeFit(activeShape, x, y)) {
          possiblePositions.add(Vector2(x.toDouble(), y.toDouble()));
        }
      }
    }
    if (possiblePositions.isNotEmpty) {
      _activeShape = activeShape;
    }
  }

  @visibleForTesting
  void rotate90Cw() {
    var rotated = List.generate(
        fields.length, (i) => List.generate(fields.first.length, (j) => 0));

    for (var i = 0; i < fields[0].length; ++i) {
      for (var j = 0; j < fields.length; ++j) {
        rotated[i][j] = fields[fields.length - j - 1][i];
      }
    }

    /// save
    for (var i = 0; i < fields.length; ++i) {
      for (var j = 0; j < fields.first.length; ++j) {
        fields[i][j] = rotated[i][j];
      }
    }
  }

  @visibleForTesting
  void rotate90Ccw() {
    var rotated = List.generate(
        fields.length, (i) => List.generate(fields.first.length, (j) => 0));

    for (var i = 0; i < fields[0].length; ++i) {
      for (var j = 0; j < fields.length; ++j) {
        rotated[i][j] = fields[j][fields[0].length - i - 1];
      }
    }

    /// save
    for (var i = 0; i < fields.length; ++i) {
      for (var j = 0; j < fields.first.length; ++j) {
        fields[i][j] = rotated[i][j];
      }
    }
  }

  int checkDeleteLine() {
    int score = 0;

    // check horizontally
    for (var y = 0; y < fields.length; y++) {
      if (!fields[y].any((e) => e == 0)) {
        // add fields to free up que
        for (var x = 0; x < fields[y].length; x++) {
          fields[y][x] = -1;
        }
      }
    }

    /// rotate clockwise
    rotate90Cw();
    // check vertically
    for (var y = 0; y < fields.length; y++) {
      if (!fields[y].any((e) => e == 0)) {
        // add fields to free up que
        for (var x = 0; x < fields[y].length; x++) {
          fields[y][x] = -1;
        }
      }
    }

    rotate90Ccw();

    // calculate score
    for (var y = 0; y < fields.length; y++) {
      for (var x = 0; x < fields[y].length; x++) {
        if (fields[y][x] == -1) {
          score++;
        }
      }
    }
    return score;
  }

  bool willShapeFit(Shape s, int x, int y) {
    // place shape on board

    // is not left or top off the field
    if (x.isNegative || y.isNegative) {
      return false;
    }

    // check if dimensions are fitting
    var isFieldLongEnough = s.width + x <= fields.first.length;
    var isFieldHighEnouth = s.height + y <= fields.length;
    if (!isFieldHighEnouth || !isFieldLongEnough) {
      return false;
    }

    for (var sy = 0; sy < s.height; sy++) {
      for (var sx = 0; sx < s.width; sx++) {
        var isShapeLineLongEngough = s.fields[sy].length > sx;
        if (isShapeLineLongEngough) {
          // does field exist?
          var isShapeFieldRelevant = s.fields[sy][sx] > 0;
          var isFieldOccupied = fields[sy + y][sx + x] > 0;
          if (isShapeFieldRelevant && // is field in shape active
              isFieldOccupied) // allready taken
          {
            return false;
          }
        }
      }
    }
    return true;
  }

  @override
  String toString() {
    var result = '';
    for (var y = 0; y < fields.length; y++) {
      for (var x = 0; x < fields[y].length; x++) {
        result += fields[y][x] == 0 ? '·' : '${fields[y][x]}';
      }
      result += '\n';
    }
    return result;
  }

  void showPreview(int x, int y, bool isFingerOnBoard) {
    // clean fields
    tidyUp();

  if(isFingerOnBoard){
Vector2? closestPossiblePosition =
        _findClosestPossiblePosition(Vector2(x.toDouble(), y.toDouble()));
    if (closestPossiblePosition == null) {
      return;
    }

    // write preview to fields
    for (var y = 0; y < _activeShape!.fields.length; y++) {
      for (var x = 0; x < _activeShape!.fields[y].length; x++) {
        if (_activeShape!.fields[y][x] > 0) {
          fields[closestPossiblePosition.y.round() + y]
              [closestPossiblePosition.x.round() + x] = -1;
        }
      }
    }
  }
    
  }

  void tidyUp() {
    for (var y = 0; y < fields.length; y++) {
      for (var x = 0; x < fields[y].length; x++) {
        if (fields[y][x] < 0) {
          fields[y][x] = 0;
        }
      }
    }
  }

  Vector2? _findClosestPossiblePosition(Vector2 target) {
    if (possiblePositions.isEmpty) {
      return null;
    }
    var result = possiblePositions.first;

    for (var p in possiblePositions) {
      if (p.distanceTo(target) < p.distanceTo(result)) {
        result = p;
      }
    }
    return result;
  }

  int dropPiece() {
    int score = 0;
    for (var y = 0; y < fields.length; y++) {
      for (var x = 0; x < fields[y].length; x++) {
        if (fields[y][x] == -1) {
          fields[y][x] = 1;
          score++;
        }
      }
    }
    _activeShape = null;
    possiblePositions = [];

    score += checkDeleteLine();
    tidyUp();
    return score;
  }

  bool willShapeFindAnyPlace(Shape? s) {
    var _possiblePositions = [];
    if(s ==null) return true;
    // check if shape will fit anywhere
    for (var y = 0; y < fields.length; y++) {
      for (var x = 0; x < fields[y].length; x++) {
        if (willShapeFit(s, x, y)) {
          _possiblePositions.add(Vector2(x.toDouble(), y.toDouble()));
        }
      }
    }
    if (_possiblePositions.isNotEmpty) {
      return true;
    }else{
      return false;
    }
  }
}
