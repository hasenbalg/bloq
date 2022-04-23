import 'package:bloq/src/model/board.dart';
import 'package:bloq/src/model/shop.dart';
import 'package:bloq/src/render/board_painter.dart';
import 'package:bloq/src/render/shop_painter.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'bloq',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Board board;
  late Shop shop;

  int hiScore = 0;

  bool? isFingerOnBoard;

  @override
  void initState() {
    board = Board(9, 9);

    shop = Shop();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SizedBox(
                width: 500,
                height: 500,
                child: GestureDetector(
                  onHorizontalDragUpdate: (details) {
                    int ixClosestToFinger =
                        (details.localPosition.dx / 500 * board.width).floor();
                    int iyClosestToFinger =
                        (details.localPosition.dy / 500 * board.height).floor();
                    setState(() {
                      isFingerOnBoard = (details.localPosition.dx > 0 &&
                              details.localPosition.dx < 500) &&
                          (details.localPosition.dy > 0 &&
                              details.localPosition.dy < 500);

                      board.showPreview(ixClosestToFinger, iyClosestToFinger,
                          isFingerOnBoard == true);
                    });
                  },
                  onVerticalDragUpdate: (details) {
                    int ixClosestToFinger =
                        (details.localPosition.dx / 500 * board.width).floor();
                    int iyClosestToFinger =
                        (details.localPosition.dy / 500 * board.height).floor();
                    setState(() {
                      isFingerOnBoard = (details.localPosition.dx > 0 &&
                              details.localPosition.dx < 500) &&
                          (details.localPosition.dy > 0 &&
                              details.localPosition.dy < 500);
                      board.showPreview(ixClosestToFinger, iyClosestToFinger,
                          isFingerOnBoard == true);
                    });
                  },
                  onHorizontalDragEnd: (_) {
                    _onTapEnd();
                  },
                  onVerticalDragEnd: (_) {
                    _onTapEnd();
                  },
                  child: LayoutBuilder(
                    builder: (_, constraints) => Container(
                      width: constraints.widthConstraints().maxWidth,
                      height: constraints.heightConstraints().maxHeight,
                      color: const Color.fromARGB(0, 255, 255, 255),
                      child: CustomPaint(painter: BoardPainter(board)),
                    ),
                  ),
                ),
              ),
              Text('$hiScore'),
              SizedBox(
                width: 500,
                height: 300,
                child: GestureDetector(
                  onTapDown: ((TapDownDetails details) {
                    if (board.hasActiveShape) {
                      setState(() {
                        shop.putBack(board.returnActiveShape());
                      });
                    } else {
                      var shopShapeIndex = ((details.localPosition.dx / 500) *
                              shop.shapes.length)
                          .floor();
                      var s = shop.select(shopShapeIndex);
                      setState(() {
                        // if shape not fit in board put back
                        if (board.willShapeFindAnyPlace(s)) {
                          board.activeShape = s;
                        } else {
                          print('no space');
                          shop.putBack(s?..willFitInBoard = false);
                        }
                      });
                    }
                  }),
                  child: LayoutBuilder(
                    builder: (_, constraints) => Container(
                      width: constraints.widthConstraints().maxWidth,
                      height: constraints.heightConstraints().maxHeight,
                      color: const Color.fromARGB(0, 255, 255, 255),
                      child: CustomPaint(painter: ShopPainter(shop)),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _onTapEnd() {
    if (isFingerOnBoard == true) {
      setState(() {
        hiScore += board.dropPiece();
        shop.update();
      });
    } else {
      setState(() {
        if (board.hasActiveShape) {
          shop.putBack(board.returnActiveShape());
        }
      });
    }

    // evaluate shop
    setState(() {
      for (var i = 0; i < shop.shapes.length; i++) {
        shop.shapes[i]?.willFitInBoard =
            board.willShapeFindAnyPlace(shop.shapes[i]);
      }
    });

    bool gameEnd =
        !shop.shapes.any((element) => element?.willFitInBoard ?? false);
    print(gameEnd);
  }
}
