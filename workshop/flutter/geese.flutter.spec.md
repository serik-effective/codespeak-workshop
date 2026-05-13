# Funny Geese — Flutter (macOS)

Geese (🪿) fly around the screen, tumbling and bouncing off walls.

## UX

- Tap on empty space — a new goose appears, flying in a random direction.
- Tap on a goose — it grows bigger. When it gets too big — it disappears with an animated pop.

## Technology

- Flutter/Dart, single widget tree, supports window resizing.
- Custom game loop using `AnimationController` or Flame game engine for better performance.
- `GestureDetector` for tap handling on geese and empty space.
- `CustomPaint` or Flame Components for goose rendering and animation.
