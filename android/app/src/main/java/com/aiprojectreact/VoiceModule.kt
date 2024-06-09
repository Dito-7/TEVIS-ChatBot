package com.aiprojectreact

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.bridge.WritableMap

class VoiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VoiceModule"
    }

    // Required for NativeEventEmitter
    @ReactMethod
    fun addListener(eventName: String) {
        // Set up any necessary listener related to the event
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Remove listeners as necessary
    }

    // Example of emitting an event to JavaScript
    fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}
