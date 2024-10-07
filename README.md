# Running the Application

Follow these instructions to start the app on different devices. Ensure you have the respective environments and tools installed before proceeding.

## Contents
1. [Prerequisites](#prerequisites)
2. [iPhone Emulator (mac only)](#start-the-app-on-an-iphone-emulator)
3. [Android Emulator](#start-the-app-on-an-android-emulator)
4. [Physical Android Device](#start-the-app-on-a-physical-android-device)

## Prerequisites
Before starting, ensure you have the necessary tools installed:
- [Node.js and npm](https://nodejs.org/)
- [Bun](https://bun.sh/)

## Start the App on an iPhone Emulator (Mac only)

Ensure you have the following:
- XCode (Install from the App Store)
- Simulator (Included with XCode)
- iOS version (e.g., 17) installed in Xcode

Steps:
1. Open the Simulator app, and go to file -> open simulator -> [choose any iphone model] 
2. In your terminal, navigate to the frontend folder.
3. Install dependencies with:

   ```
   bun i
   ```

4. Launch the app with:

   ```
   bun run ios
   ```

5. Once the app starts, run:

   ```
   bun run start
   ```

6. Press the "i" key to launch the app on the emulated iPhone.

## Start the App on an Android Emulator

Ensure you have Android Studio installed.

Steps:
1. Complete the Android Studio setup to recognize your device (add necessary SDKs to the path).
2. Ensure your emulator is listed by running `adb devices`.
3. In the terminal, from the frontend folder, install dependencies with:

   ```
   bun i
   ```

4. Launch the app with:

   ```
   bun run android
   ```

5. Once installed, run:

   ```
   bun run start
   ```

6. Press "a" to open the app on the Android emulator.

## Start the App on a Physical Android Device

Steps:
1. Enable Developer Mode on your Android phone (usually involves tapping a setting item multiple times; search online for specific instructions for your device).
2. Connect your phone to your computer via USB-C.
3. Ensure your device is recognized (run `adb devices` in the terminal).
4. In the terminal, from the frontend folder, install dependencies with:

   ```
   bun i
   ```

5. Launch the app with:

   ```
   bun run android
   ```

6. Press "shift+a" and select your physical device to launch the app.
