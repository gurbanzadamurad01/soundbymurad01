package com.soundbymurad.app;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

public class MainActivity extends BridgeActivity {

    private Insets safeArea = Insets.NONE;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // The app draws edge-to-edge (behind the status bar and gesture bar). The bar sizes are
        // handed to the page as --safe-top / --safe-bottom, which the header and player pad by.
        // (Android WebViews before Chrome 136 report env(safe-area-inset-*) as 0.)
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        View content = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(content, (v, windowInsets) -> {
            safeArea = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            sendSafeArea();
            return WindowInsetsCompat.CONSUMED;
        });

        bridge.addWebViewListener(new WebViewListener() {
            @Override
            public void onPageLoaded(WebView webView) {
                sendSafeArea();
            }
        });
    }

    private void sendSafeArea() {
        if (bridge == null || bridge.getWebView() == null) return;
        float density = getResources().getDisplayMetrics().density;
        String js = String.format(
            java.util.Locale.US,
            "(function(s){s.setProperty('--safe-top','%.1fpx');s.setProperty('--safe-bottom','%.1fpx');s.setProperty('--safe-left','%.1fpx');s.setProperty('--safe-right','%.1fpx');})(document.documentElement.style)",
            safeArea.top / density, safeArea.bottom / density, safeArea.left / density, safeArea.right / density
        );
        bridge.getWebView().post(() -> bridge.getWebView().evaluateJavascript(js, null));
    }
}
