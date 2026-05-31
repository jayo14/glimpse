import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:io' show Platform;
import '../shared/theme.dart';
import 'qr_scanner_screen.dart';
import '../auth/login_screen.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    bool isIOS = false;
    try {
      isIOS = Platform.isIOS;
    } catch (_) {}

    Widget body = Container(
      width: double.infinity,
      decoration: const BoxDecoration(color: GlimpseColors.ink),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 48.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Spacer(),
              Container(
                height: 100,
                width: 100,
                decoration: BoxDecoration(
                  color: GlimpseColors.primaryViola.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: Icon(
                    Icons.center_focus_strong_rounded,
                    color: GlimpseColors.primaryViola,
                    size: 64,
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                "Glimpse",
                style: Theme.of(
                  context,
                ).textTheme.displayLarge?.copyWith(color: Colors.white),
              ),
              const SizedBox(height: 16),
              Text(
                "Scan. Smile. See yourself. Done.",
                style: Theme.of(
                  context,
                ).textTheme.bodyLarge?.copyWith(color: GlimpseColors.mutedText),
                textAlign: TextAlign.center,
              ),
              const Spacer(),

              if (isIOS)
                CupertinoButton.filled(
                  onPressed: () => Navigator.push(
                    context,
                    CupertinoPageRoute(
                      builder: (context) => const QrScannerScreen(),
                    ),
                  ),
                  child: const Text(
                    "SCAN EVENT QR",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                )
              else
                ElevatedButton(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const QrScannerScreen(),
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(double.infinity, 56),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.qr_code_scanner_rounded),
                      SizedBox(width: 12),
                      Text("SCAN EVENT QR"),
                    ],
                  ),
                ),

              const SizedBox(height: 24),

              if (isIOS)
                CupertinoButton(
                  onPressed: () => Navigator.push(
                    context,
                    CupertinoPageRoute(
                      builder: (context) => const LoginScreen(),
                    ),
                  ),
                  child: Text(
                    "HOST LOGIN",
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.7),
                    ),
                  ),
                )
              else
                TextButton(
                  onPressed: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const LoginScreen(),
                    ),
                  ),
                  child: Text(
                    "HOST LOGIN",
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.7),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );

    if (isIOS) {
      return CupertinoPageScaffold(child: body);
    } else {
      return Scaffold(body: body);
    }
  }
}
