import 'package:bloq/src/model/shape.dart';

class Shop {
  late List<Shape?> shapes;

  int? _selectedShapeIndex;

  Shop() {
    shapes = List.generate(3, (index) => Shape.random());
  }

  Shape? select(int index) {
    if (_selectedShapeIndex == null) {
      // if only one left take it
      if (shapes.where((s) => s != null).length == 1) {
        index = shapes.indexOf(shapes.firstWhere((s) => s != null));
      }
      shapes.insert(index, null);
      _selectedShapeIndex = index;
      return shapes.removeAt(index + 1);
    }
    return null;
  }

  void putBack(Shape? s) {
    if (s == null) return;
    shapes[_selectedShapeIndex!] = s;
    _selectedShapeIndex = null;
  }

  void update() {
    _selectedShapeIndex = null;

    if (!shapes.any((s) => s != null)) {
      shapes = List.generate(3, (index) => Shape.random());
    }
  }
}
