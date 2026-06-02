import 'package:flutter/material.dart';
import 'colors.dart';
import 'typography.dart';

class GlimpseTheme {
  static ThemeData get light => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    scaffoldBackgroundColor: GlimpseColors.background,
    colorScheme: ColorScheme.fromSeed(
      seedColor: GlimpseColors.primary,
      primary: GlimpseColors.primary,
      onPrimary: GlimpseColors.primaryForeground,
      surface: GlimpseColors.background,
      onSurface: GlimpseColors.foreground,
    ),
    textTheme: TextTheme(
      displayLarge: GlimpseTypography.heading,
      bodyLarge: GlimpseTypography.body,
    ),
  );

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: GlimpseColors.darkBackground,
    colorScheme: const ColorScheme.dark(
      primary: GlimpseColors.primaryForeground,
      onPrimary: GlimpseColors.primary,
      surface: GlimpseColors.darkBackground,
      onSurface: GlimpseColors.darkForeground,
    ),
    textTheme: TextTheme(
      displayLarge: GlimpseTypography.heading.copyWith(color: GlimpseColors.darkForeground),
      bodyLarge: GlimpseTypography.body.copyWith(color: GlimpseColors.darkForeground),
    ),
  );
}
