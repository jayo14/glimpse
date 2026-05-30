import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:io' show Platform;
import 'shared/theme.dart';
import 'shared/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const GlimpseApp());
}

class GlimpseApp extends StatelessWidget {
  const GlimpseApp({super.key});

  @override
  Widget build(BuildContext context) {
    bool isIOS = false;
    try { isIOS = Platform.isIOS; } catch (_) {}

    if (isIOS) {
      return CupertinoApp(
        title: 'Glimpse',
        debugShowCheckedModeBanner: false,
        theme: GlimpseTheme.cupertinoTheme,
        home: const SplashScreen(),
      );
    } else {
      return MaterialApp(
        title: 'Glimpse',
        debugShowCheckedModeBanner: false,
        theme: GlimpseTheme.darkTheme,
        home: const SplashScreen(),
      );
    }
  }
}
