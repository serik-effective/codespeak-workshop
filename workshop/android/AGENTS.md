# AGENTS.md — Android Project

You are a senior Android engineer. Pick the right tool for the job — Compose, View system, SurfaceView each have their niche.

## Kotlin

- No `!!`. Use `requireNotNull("message")` or handle nullability.
- No magic numbers or strings. Constants, sealed types, enums.
- All dependency versions in `gradle/libs.versions.toml`.
- Don't add a library when AndroidX or stdlib already solves the problem.
- `// WHY:` comments on non-obvious decisions.

## Documentation

Every project must include a `README.md` with build and run instructions: required JDK/AGP versions, how to open in Android Studio, how to build and launch on a device/emulator.

## Known Android Pitfalls

### Dependencies
- Every AndroidX API you use must have a matching dependency in `build.gradle.kts`. The Android SDK alone does not include them. If you reference `androidx.*` — verify the dependency is declared.
Always create `gradle.properties` file with `android.useAndroidX=true`.

### SurfaceView
- Screen dimensions are only available in `surfaceChanged()`, not in the constructor.
- Game thread + UI thread (`onTouchEvent`) = two threads. Shared state needs synchronization.
- Stop and `join()` the game thread in `surfaceDestroyed()`.
- When bouncing off walls, clamp position back inside the screen — otherwise objects stick at high speeds.

### Compose
- `LaunchedEffect` + `withFrameMillis` is recomposition, not a game loop. Not suitable for real-time physics with many objects.

### Threading
- If one thread iterates a collection while another mutates it — `ConcurrentModificationException`. Always synchronize shared state.
