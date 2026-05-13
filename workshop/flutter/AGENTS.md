# AGENTS.md — Flutter Project

You are a senior Flutter engineer. Pick the right tool for the job — Widgets, CustomPaint, AnimationController, Rive, Flame each have their niche.

## Dart/Flutter

- No null assertion operators (`!`) in production code. Use null-aware operators, `??`, or `assert()` in debug only.
- No magic numbers or strings. Constants, enums with associated values.
- Don't add a dependency (pub.dev) when Flutter SDK already solves the problem.
- `// WHY:` comments on non-obvious decisions.

## Documentation

Every project must include a `README.md` with build and run instructions: required Flutter version, Dart version, platform targets, how to run on simulator/device.

## Known Flutter Pitfalls

### AnimationController & Game Loops
- `AnimationController` vsync must be provided via `TickerProvider`. Use `SingleTickerProviderStateMixin` or `TickerProviderStateMixin`.
- For manual frame control, use `WidgetsBinding.instance.addPostFrameCallback` or custom tickers.
- Always dispose animation controllers in `dispose()` method to prevent memory leaks.
- For physics simulations, calculate delta time properly — don't assume fixed frame rates.

### CustomPaint & Canvas
- `CustomPaint` widget with `CustomPainter` is Flutter's equivalent to UIKit's drawing.
- The `paint()` method is called each frame when `shouldRepaint()` returns true.
- For complex animations, mark painter as repaintable with `shouldRepaint` returning true and use `Listenable` (like `AnimationController`) for efficiency.
- For real-time games with many objects, consider using Flame game engine instead of manual `CustomPaint`.

### Flame Game Engine
- Flame provides proper game loop with fixed time steps and delta time calculation.
- Use `FlameGame` for sprite-based games, Component system for game objects.
- Flame handles device pixel ratio and coordinate system automatically.

### Concurrency
- Flutter's UI runs on main thread — all widget builds, painting, and touch handling happen here.
- Use `Isolate` for heavy computations, but remember that only main thread can update UI.
- For state management with async operations, use proper patterns (Provider, Riverpod, Bloc) to avoid `setState()` during build.

### Performance
- Avoid rebuilding entire widget trees each frame. Use `const` constructors and `RepaintBoundary` widgets.
- For animations, prefer `AnimatedBuilder`, `AnimatedContainer` over `setState()` in every frame.
- Use Profile mode to test performance, not just Debug mode.

### Common Mistakes
- Forgetting to call `super.dispose()` in State disposal.
- Not handling different screen sizes and orientations properly.
- Using `setState()` inside build method or during async callbacks without guards.
- Not testing on both iOS and Android — platform differences exist even with Flutter.
- Forgetting to add necessary permissions in `Info.plist` (iOS) or `AndroidManifest.xml`.

### Platform-Specific Considerations
- On macOS, Flutter apps run as macOS desktop apps — handle window resizing, menu bars, and desktop-specific interactions.
- Use `Platform.isMacOS` for platform-specific code when needed.
- For Mac performance: Metal rendering is used on macOS, which is generally efficient for Flutter.

## Getting Started on macOS

Check Flutter doctor:

```bash
flutter doctor
```

Run on macOS desktop:

```bash
flutter run -d macos
```

Build for release:

```bash
flutter build macos
```
