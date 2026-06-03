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
      theme: GlimpseTheme.light.copyWith(
        textTheme: GlimpseTheme.light.textTheme.apply(fontFamily: 'Geist')
      ),
      darkTheme: GlimpseTheme.dark.copyWith(
        textTheme: GlimpseTheme.dark.textTheme.apply(fontFamily: 'Geist')
      ),
      themeMode: ThemeMode.dark,
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
