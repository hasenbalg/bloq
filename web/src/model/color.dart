class Color {
  static Color boardColor = Color(r: 200, g: 200, b: 200, a: 1);
  static Color white = Color(r: 200, g: 200, b: 200, a: 1);
  static Color backgroundColor = Color(r: 255, g: 255, b: 255, a: 1);

  static List<Color> rainbow = [
    Color(r: 255, g: 0, b: 19, a: 0), // rot
    Color(r: 255, g: 96, b: 28, a: 0), // orange
    Color(r: 255, g: 254, b: 59, a: 0), // gelb
    Color(r: 0, g: 127, b: 28, a: 0), // gruen
    Color(r: 0, g: 33, b: 250, a: 0), // royal blau
    Color(r: 74, g: 15, b: 127, a: 0), // dunkellila
    Color(r: 186, g: 57, b: 251, a: 0), // lila
    Color(r: 70, g: 190, b: 253, a: 0) // blau
    // new Color(121,79,34), // braun
  ];

  num r, g, b, a;
  Color({
    this.r,
    this.g,
    this.b,
    this.a,
  });

  void makeTransparent(num a) {
    this.a = a.clamp(0, 1);
  }

  void makeOpaque() {
    a = 1;
  }

  @override
  String toString() {
    return 'rgba($r, $g, $b, $a)';
  }

  static Color getRandomColor() {
    return (rainbow.toList()..shuffle()).first;
  }
}
