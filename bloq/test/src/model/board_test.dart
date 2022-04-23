import 'package:bloq/src/model/board.dart';
import 'package:bloq/src/model/shape.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('board test', () {
    test('rotation 90d cw', () {
      var board = Board.fromFields([
        [1, 2],
        [3, 4]
      ]);
      board.rotate90Cw();
      expect(board.fields, [
        [3, 1],
        [4, 2]
      ]);
    });

    test('rotation 90d ccw', () {
      var board = Board.fromFields([
        [1, 2],
        [3, 4]
      ]);
      board.rotate90Ccw();
      expect(board.fields, [
        [2, 4],
        [1, 3]
      ]);
    });

    test('check delete lines cross', () {
      var board = Board.fromFields([
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 0],
      ]);
      board.checkDeleteLine();
      expect(board.fields, [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, 0],
      ]);
    });

    test('check delete lines vertical', () {
      var board = Board.fromFields([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ]);
      board.checkDeleteLine();
      expect(board.fields, [
        [0, -1, 0],
        [0, -1, 0],
        [0, -1, 0],
      ]);
    });

    test('check delete lines horizontal', () {
      var board = Board.fromFields([
        [0, 0, 0],
        [1, 2, 3],
        [0, 0, 0],
      ]);
      board.checkDeleteLine();
      expect(board.fields, [
        [0, 0, 0],
        [-1, -1, -1],
        [0, 0, 0],
      ]);
    });

    test('shape flash will fit ', () {
      var board = Board.fromFields([
        [0, 0, 3],
        [0, 0, 0],
        [0, 0, 0],
      ]);
      expect(board.willShapeFit(Shape.flash(), 0, 0), true);
    });

    test('shape flash will not fit ', () {
      var board = Board.fromFields([
        [0, 0, 3],
        [0, 0, 3],
        [0, 0, 0],
      ]);
      expect(board.willShapeFit(Shape.flash(), 0, 0), false);
    });

    test('shape flash will not fit top', () {
      var board = Board.fromFields([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
      expect(board.willShapeFit(Shape.flash(), -1, -1), false);
    });

    test('shape flash will not fit bottom', () {
      var board = Board.fromFields([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
      expect(board.willShapeFit(Shape.flash(), 1, 1), false);
    });
  });
}
