
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @invertase/react-native-apple-authentication
import com.RNAppleAuthentication.AppleAuthenticationAndroidPackage;
// @react-native-clipboard/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/slider
import com.reactnativecommunity.slider.ReactSliderPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/firestore
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
// @react-native-google-signin/google-signin
import com.reactnativegooglesignin.RNGoogleSigninPackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// @stripe/stripe-react-native
import com.reactnativestripesdk.StripeSdkPackage;
// react-native-background-timer
import com.ocetnik.timer.BackgroundTimerPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fbsdk-next
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-in-app-review
import com.ibits.react_native_in_app_review.AppReviewPackage;
// react-native-keep-awake
import com.corbt.keepawake.KCKeepAwakePackage;
// react-native-music-control
import com.tanguyantoine.react.MusicControl;
// react-native-payments
import com.reactnativepayments.ReactNativePaymentsPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-restart
import com.reactnativerestart.RestartPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-store-review
import com.oblador.storereview.StoreReviewPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// tipsi-stripe
import com.gettipsi.stripe.StripeReactPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AppleAuthenticationAndroidPackage(),
      new ClipboardPackage(),
      new ReactSliderPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseFirestorePackage(),
      new RNGoogleSigninPackage(),
      new RNCPickerPackage(),
      new StripeSdkPackage(),
      new BackgroundTimerPackage(),
      new RNDeviceInfo(),
      new FBSDKPackage(),
      new RNGestureHandlerPackage(),
      new PickerPackage(),
      new ImagePickerPackage(),
      new AppReviewPackage(),
      new KCKeepAwakePackage(),
      new MusicControl(),
      new ReactNativePaymentsPackage(),
      new RNPermissionsPackage(),
      new RestartPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new RNSoundPackage(),
      new StoreReviewPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new ReactVideoPackage(),
      new RNCWebViewPackage(),
      new StripeReactPackage()
    ));
  }
}
