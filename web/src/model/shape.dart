import 'dart:math';

import 'color.dart';
import 'game.dart';

class Shape {
  static var FLYHOMESPEED = .4;
  List<List<num>> pattern = [
    [1, 1, 1]
  ];

  Color color;
  num segmentEdgeLength;
  Point position = Point(0, 0), _initialPosition;
  num _halfWidth, _halfHeight;
  bool isOverShop = true, invalidDrop = false, isActive = true;

  Game game;

  Shape({
    this.game,
    this.pattern,
    this.position,
    this.color,
  }) {
    segmentEdgeLength = game.getSegemetEdgeLength();
    _initialPosition = position;
    _halfWidth = _getLongestRow() * segmentEdgeLength / 2;
    _halfHeight = pattern.length * segmentEdgeLength / 2;
  }

  void render() {
    if (isOverShop) {
      for (var y = 0; y < pattern.length; y++) {
        for (var x = 0; x < pattern[y].length; x++) {
          if (pattern[y][x] > 0) {
            game.drawRect(
                position.x + (x * segmentEdgeLength) - _halfWidth,
                position.y + (y * segmentEdgeLength) - _halfHeight,
                segmentEdgeLength,
                segmentEdgeLength,
                color.toString());
          }
        }
      }
    }
  }

  void update() {
    if (invalidDrop) {
      //fly home

      position = Point(lerp(position.x, _initialPosition.x, FLYHOMESPEED),
          lerp(position.y, _initialPosition.y, FLYHOMESPEED));
      if (abs(position.x - _initialPosition.x) < FLYHOMESPEED &&
          abs(position.y - _initialPosition.y) < FLYHOMESPEED) {
        position = _initialPosition;
        invalidDrop = false;
      }
    }

    if (isActive) {
      color.makeOpaque();
    } else {
      color.makeTransparent(.5);
      //dont move
      position = _initialPosition;
    }
  }

  static List<List<num>> EMPTY = [[]];

  static List<List<num>> L = [
    [1],
    [1],
    [1, 1]
  ];

  static List<List<num>> J = [
    [0, 1],
    [0, 1],
    [1, 1]
  ];

  static List<List<num>> TRI = [
    [0, 1],
    [1, 1, 1]
  ];

  static List<List<num>> QUAD = [
    [1, 1],
    [1, 1]
  ];

  static List<List<num>> BAR3VERTICAL = [
    [1],
    [1],
    [1]
  ];

  static List<List<num>> BAR3HORIZONTAL = [
    [1, 1, 1]
  ];

  static List<List<num>> FLASH = [
    [1],
    [1, 1, 1],
    [0, 0, 1]
  ];

  static List<List<num>> Z = [
    [1, 1],
    [0, 1, 1]
  ];

  static List<List<num>> G = [
    [1, 1],
    [0, 1]
  ];
  static List<List<num>> DOT = [
    [1]
  ];

  num _getLongestRow() {
    return (pattern.toList()..sort((a, b) => b.length.compareTo(a.length)))
        .first
        .length;
  }

  num lerp(num v1, num v2, double amount) {
    return (1 - amount) * v1 + amount * v2;
  }

  num abs(num v) {
    return v < 0 ? v : v * -1;
  }

  static Shape getClone(Shape orig, Point position) {
    var copy = Shape(
        game: orig.game,
        pattern: orig.pattern,
        position: position,
        color: Color.getRandomColor());
    //copy.position = position;
    copy.segmentEdgeLength = orig.segmentEdgeLength;
    return copy;
  }

  bool isTouched(Point fingerPos) {
    var dx = fingerPos.x - position.x;
    var dy = fingerPos.y - position.y;
    var distance = sqrt(dx * dx + dy * dy);
    var radius = (_halfWidth > _halfHeight ? _halfWidth : _halfHeight);
    if (distance < radius) {
      return true;
    }
    return false;
  }

  num getPoints() {
    return pattern.expand((line) => line).where((i) => i != 0).length;
  }
}
