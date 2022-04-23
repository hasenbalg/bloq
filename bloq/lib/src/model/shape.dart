import 'dart:math';

class Shape {
  late final List<List<int>> fields;

  Shape.l() {
    fields = [
      [1],
      [1],
      [1, 1]
    ];
  }

  Shape.j() {
    fields = [
      [0, 1],
      [0, 1],
      [1, 1]
    ];
  }

  Shape.tri() {
    fields = [
      [0, 1],
      [1, 1, 1]
    ];
  }

  Shape.quad() {
    fields = [
      [1, 1],
      [1, 1]
    ];
  }

  Shape.bar3vertical() {
    fields = [
      [1],
      [1],
      [1]
    ];
  }
  Shape.bar3horizontal() {
    fields = [
      [1, 1, 1]
    ];
  }

  Shape.flash() {
    fields = [
      [1],
      [1, 1, 1],
      [0, 0, 1]
    ];
  }

  Shape.z() {
    fields = [
      [1, 1],
      [0, 1, 1]
    ];
  }

  Shape.g() {
    fields = [
      [1, 1],
      [0, 1]
    ];
  }
  Shape.dot() {
    fields = [
      [1]
    ];
  }

  Shape(this.fields);

  int get width => fields.map((e) => e.length).reduce(max);

  int get height => fields.length;

  static Shape random() {
    switch (Random().nextInt(8)) {
      case 1:
        return Shape.bar3horizontal();
      case 2:
        return Shape.bar3vertical();
      case 3:
        return Shape.dot();
      case 4:
        return Shape.flash();
      case 5:
        return Shape.g();
      case 6:
        return Shape.j();
      case 7:
        return Shape.l();
      case 8:
        return Shape.quad();
      case 9:
        return Shape.tri();
      default:
        return Shape.z();
    }
  }

  void goHome() {}

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
}
