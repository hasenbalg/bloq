import 'dart:html';

import 'src/Screens/start_screen.dart';

var currentScreen;
void main() {
  currentScreen = StartScreen();
  loop(window);
}

void loop(Window window) {
  currentScreen.update();
  currentScreen.render();
  window.requestAnimationFrame((highResTime) => loop(window));
}
