import 'package:bloq/src/model/shop.dart';
import 'package:flutter/material.dart';

class ShopPainter extends CustomPainter {
  Shop shop;
  ShopPainter(this.shop);

  @override
  void paint(Canvas canvas, Size size) {
    Size offset = Size(size.width / (shop.shapes.length + 2), size.height / 3);
    double fieldDimension = 44;

    for (var s in shop.shapes) {
      if (s != null) {
        for (var y = 0; y < s.height; y++) {
          for (var x = 0; x < s.width; x++) {
            var x0 = (fieldDimension * x) + offset.width;
            var y0 = (fieldDimension * y) + offset.height;
            if (s.fields[y].length > x && s.fields[y][x] > 0) {
              final paint = Paint()
                ..style = PaintingStyle.fill
                ..strokeWidth = 1.0
                ..color = Colors.green;
              canvas.drawRRect(
                  RRect.fromRectAndRadius(
                      Rect.fromLTWH(x0, y0, fieldDimension, fieldDimension),
                      const Radius.circular(0)),
                  paint);
            }
          }
        }
        // final paint = Paint()
        //   ..style = PaintingStyle.stroke
        //   ..strokeWidth = 1.0
        //   ..color = const Color.fromARGB(255, 255, 85, 85);

        // Offset center = Offset(offset.width + s.width * fieldDimension / 2,
        //     offset.height + s.height * fieldDimension / 2);

        // canvas.drawOval(
        //     Rect.fromCenter(center: center, width: 60, height: 60), paint);
      }
      offset = Size(offset.width * 2, offset.height);
    }
  }

  @override
  bool shouldRepaint(ShopPainter oldDelegate) => false;
}
