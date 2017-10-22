package com.comprpay;

import android.app.Application;

import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactApplication;
import com.reactlibrary.RNHcePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new RNHcePackage()
                );
    }

    /*
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
    }
    */

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
