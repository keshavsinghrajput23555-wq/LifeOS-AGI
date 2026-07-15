# Don't React Challenge (Android)

A complete Android game app where players must keep a straight face in front of the front camera for **10 seconds**.

## Features
- Front camera preview with CameraX
- Face detection via Google ML Kit
- Detects smile probability and eye openness probability
- Random challenge each round:
  - Don't smile
  - Don't blink
  - Don't laugh
- 10-second timer
- Immediate loss when a reaction is detected
- Win screen when player stays serious for full timer
- Dark modern UI
- Custom app icon (adaptive icon)
- Built-in generated win/lose sound effects

## Tech stack
- Kotlin
- Android Studio project structure (Gradle Kotlin DSL)
- CameraX + ML Kit Face Detection

## Project structure
- `app/src/main/java/com/dontreact/challenge/MainActivity.kt` – game flow, UI states, camera setup
- `app/src/main/java/com/dontreact/challenge/FaceReactionAnalyzer.kt` – ML Kit frame analyzer
- `app/src/main/java/com/dontreact/challenge/ChallengeType.kt` – random challenge enum
- `app/src/main/res/layout/activity_main.xml` – start/game/result screens
- `app/src/main/java/com/dontreact/challenge/SoundEffects.kt` – generated win/lose sound effects
- `app/src/main/res/mipmap-anydpi-v26/*` + `drawable/ic_launcher_foreground.xml` – app icon

## Dependencies included
- CameraX: `camera-core`, `camera-camera2`, `camera-lifecycle`, `camera-view`
- ML Kit Face Detection: `com.google.mlkit:face-detection`
- Material Components + AndroidX app dependencies

## How reaction detection works
- **Don't smile**: loses if smile probability > `0.55`
- **Don't laugh**: loses if smile probability > `0.75`
- **Don't blink**: loses if left/right eye open probability <= `0.40`

These thresholds are intentionally simple and can be tuned per device lighting conditions.

## Step-by-step: run in Android Studio
1. Open Android Studio (Hedgehog+ recommended).
2. Click **Open** and select this project folder.
3. Let Gradle sync complete.
4. Connect a physical Android phone (recommended for front camera) or start an emulator with camera support.
5. Press **Run ▶**.
6. On first launch, grant camera permission.
7. Tap **Start Challenge** and keep a straight face for 10 seconds.

## Notes
- Front camera is selected via `CameraSelector.LENS_FACING_FRONT`.
- If no front camera exists, CameraX binding may fail and show an error message.
- For best ML Kit performance, use good lighting and keep the full face in frame.
