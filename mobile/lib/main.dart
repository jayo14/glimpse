import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/navigation/router.dart';
import 'core/theme/theme.dart';

void main() {
  runApp(const ProviderScope(child: GlimpseApp()));
}

class GlimpseApp extends StatelessWidget {
  const GlimpseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Glimpse',
      theme: GlimpseTheme.light,
      darkTheme: GlimpseTheme.dark,
      themeMode: ThemeMode.dark,
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
