import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:google_fonts/google_fonts.dart';

class GlimpseColors {
  static const Color primaryViola = Color(0xFFC2185B);
  static const Color deepViola = Color(0xFF8E0038);
  static const Color blush = Color(0xFFFCE4EC);
  static const Color ink = Color(0xFF0F0E17);
  static const Color dusk = Color(0xFF1C1B2E);
  static const Color champagne = Color(0xFFFAF7F2);
  static const Color flashGold = Color(0xFFFFD54F);
  static const Color apertureTeal = Color(0xFF00BFA5);
  static const Color mutedText = Color(0xFF94A3B8);
}

class GlimpseTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: GlimpseColors.primaryViola,
      scaffoldBackgroundColor: GlimpseColors.ink,
      colorScheme: const ColorScheme.dark(
        primary: GlimpseColors.primaryViola,
        secondary: GlimpseColors.apertureTeal,
        surface: GlimpseColors.dusk,
        onSurface: Colors.white,
      ),
      textTheme: GoogleFonts.dmSansTextTheme(
        ThemeData.dark().textTheme.copyWith(
          displayLarge: GoogleFonts.cormorantGaramond(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.white),
          displayMedium: GoogleFonts.cormorantGaramond(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white),
          headlineMedium: GoogleFonts.dmSans(fontSize: 24, fontWeight: FontWeight.w600, color: Colors.white),
          bodyLarge: GoogleFonts.dmSans(fontSize: 16, color: Colors.white),
          bodyMedium: GoogleFonts.dmSans(fontSize: 14, color: GlimpseColors.mutedText),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: GlimpseColors.primaryViola,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        ),
      ),
    );
  }

  static CupertinoThemeData get cupertinoTheme {
    return const CupertinoThemeData(
      brightness: Brightness.dark,
      primaryColor: GlimpseColors.primaryViola,
      scaffoldBackgroundColor: GlimpseColors.ink,
      barBackgroundColor: GlimpseColors.ink,
    );
  }
}
