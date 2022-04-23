import 'dart:math';

import 'package:bloq/src/model/board.dart';
import 'package:flutter/material.dart';

class BoardPainter extends CustomPainter {
  Board board;
  BoardPainter(this.board);

  @override
  void paint(Canvas canvas, Size size) {
    double boardWidth = max(size.width, size.height);
    double fieldDimension = boardWidth / board.fields.length;

    for (var y = 0; y < board.fields.length; y++) {
      for (var x = 0; x < board.fields[y].length; x++) {
        var x0 = fieldDimension * x;
        var y0 = fieldDimension * y;

        Color color = Colors.green;
        switch (board.fields[y][x]) {
          case 0:
            color = const Color.fromARGB(0, 255, 255, 255);
            break;
          case -1:
            color = const Color.fromARGB(255, 197, 197, 197);
            break;
        }

        final paint = Paint()
          ..style = PaintingStyle.fill
          ..strokeWidth = 1.0
          ..color = color;
        canvas.drawRRect(
            RRect.fromRectAndRadius(
                Rect.fromLTWH(x0, y0, fieldDimension, fieldDimension),
                const Radius.circular(0)),
            paint);

        // paint boarder
        final boarderpaint = Paint()
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1.0
          ..color = const Color.fromARGB(221, 99, 99, 99);
        canvas.drawRRect(
            RRect.fromRectAndRadius(
                Rect.fromLTWH(0, 0, size.width, size.height),
                const Radius.circular(5)),
            boarderpaint);
      }
    }
  }

  @override
  bool shouldRepaint(BoardPainter oldDelegate) => false;
}
