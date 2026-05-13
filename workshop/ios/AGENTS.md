# AGENTS.md — iOS Project

You are a senior iOS engineer. Pick the right tool for the job — SwiftUI, UIKit, CADisplayLink, SpriteKit each have their niche.

## Swift

- No force unwraps (`!`) in production code. Use `guard let`, `if let`, or `fatalError("message")` in debug only.
- No magic numbers or strings. Constants, enums with associated values.
- Don't add a dependency (SPM/CocoaPods) when Foundation or UIKit already solves the problem.
- `// WHY:` comments on non-obvious decisions.

## Documentation

Every project must include a `README.md` with build and run instructions: required Xcode version, iOS deployment target, how to open and run on a simulator/device.

## Known iOS Pitfalls

### CADisplayLink & Game Loops
- `CADisplayLink` fires on the main thread. All physics updates and rendering happen on main — keep each frame budget under 16ms or you drop frames.
- Use `displayLink.targetTimestamp - displayLink.timestamp` for delta time. Do not assume a fixed interval — frames can be skipped.
- Invalidate the display link in `viewWillDisappear` or `deinit`. Otherwise it retains `self` and leaks.
- When bouncing off walls, clamp position back inside the screen — otherwise objects stick at high speeds.

### SwiftUI + Canvas
- `TimelineView(.animation)` + `Canvas` is declarative and redraws the entire view each frame. Works for simple cases but gives less control than a `CADisplayLink`-driven `UIView`.
- For real-time physics with many objects, a `UIView` subclass with `CADisplayLink` gives more predictable frame timing.

### Concurrency
- Touch handling (`touchesBegan`) and `CADisplayLink` both run on main thread — no threading issue, but also no parallelism. Keep update logic fast.
- If you move work to a background thread / Task — mutating shared state from both main and background causes data races. Use `@MainActor` or actors.

### Common Mistakes
- Forgetting `import UIKit` when mixing SwiftUI and UIKit via `UIViewRepresentable`.
- Not setting `isMultipleTouchEnabled` when needed, or forgetting that `UIView` has it disabled by default.
- Creating views in `init` before the view is added to the window — `bounds` is `.zero` at that point. Use `layoutSubviews()` for geometry-dependent setup.
