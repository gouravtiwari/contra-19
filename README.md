# contra-19

Ionic app.

More details to be added

## Development setup

- Install packages:

```
$ npm install
```

- Running in lab mode

```
$ npm i @ionic/lab --save-dev
$ ionic serve -l
```

### How to test it on mobile?

On Mac

- Install Android Studio, which also install android SDK
- Connect your mobile in developer mode
- Install native-run package `npm i -g native-run`
- run ` ionic cordova run android -l`
- Common issues while installing and configuring android SDK
  1. `ANDROID_SDK_ROOT` and `ANDROID_HOME` are not configured correctly

  ```
    Failed to find 'ANDROID_HOME' environment variable. Try setting it manually.
    Failed to find 'android' command in your 'PATH'. Try update your 'PATH' to include path to valid SDK directory.
    [ERROR] An error occurred while running subprocess cordova.
  ```
  Setup as:

  ```
    ANDROID_SDK_ROOT=/Users/<user>/Library/Android/sdk (recommended setting)
    ANDROID_HOME=/Users/<user>/Library/Android/sdk (DEPRECATED)
  ```

  2. Gradle not installed

  ```
    Could not find an installed version of Gradle either in Android Studio,
    or on your system to install the gradle wrapper. Please include gradle
    in your path, or install Android Studio
    [ERROR] An error occurred while running subprocess cordova.
  ```

  Run:

  ```
    brew install gradle
  ```

  3. License were not accepted

  ```
  A problem occurred configuring project ':app'.
  > Failed to install the following Android SDK packages as some licences have not been accepted.
     platforms;android-28 Android SDK Platform 28
  ```

  Go to Android Studio preferences and install development tools, which will prompt for license agreement. Accept the license and that should be it.

- Issues on Ubuntu:

  1. When U run `ionic cordova run android -l` the error prompted that config.xml or package.json not available. Execute following:
  ```
    integrations enable cordova --add
  ```
  2. Error while getting native targets for android: No valid Android SDK root found
  In bashrc set following and do `source ~/.bashrc`
  ```
    export ANDROID_HOME=/home/<user>/Android/Sdk
    export ANDROID_SDK_ROOT=/home/<user>/Android/Sdk
  ```
  3. [ERROR] The Cordova CLI was not found on your PATH. Please install Cordova globally:
  ```
    npm i -g cordova
  ```

### Change default app icon

1. Run and add cordova integrations

```
ionic integrations enable cordova --add
```

2. Install cordova=res globally

```
npm i -g cordova-res
```

3. Generate ios and android icons in /resources

```
ionic cordova resources ios
ionic cordova resources android
```


### Tutorials/Resources:

- [Barcode Scanner](https://www.freakyjolly.com/ionic-barcode-qr-code-scanner-generator-tutorial/)
- [Barcode/QR code generator/scanner](https://enappd.com/blog/ionic-4-qr-code-barcode-scanning/82/)
- [Anonymous login with Firebase](https://enappd.com/blog/firebase-anonymous-login-in-ionic-4/37/)
- [Graphics](https://github.com/soroushchehresa/awesome-coronavirus)
- [DateTime Picker](https://ionicframework.com/docs/api/datetime)