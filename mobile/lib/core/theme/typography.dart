import 'package:flutter/material.dart';
import 'colors.dart';

class GlimpseTypography {
  static const String headingFamily = 'EB Garamond';
  static const String bodyFamily = 'Geist';

  static TextStyle get heading => const TextStyle(
    fontFamily: headingFamily,
    fontSize: 56,
    color: GlimpseColors.pureWhite,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.015 * 56,
    height: 1.0,
  );

  static TextStyle get body => const TextStyle(
    fontFamily: bodyFamily,
    fontSize: 16,
    color: GlimpseColors.foreground,
    fontWeight: FontWeight.w400,
  );

  static TextStyle get tagline => const TextStyle(
    fontFamily: bodyFamily,
    fontSize: 11,
    color: GlimpseColors.coolGray,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.18 * 11,
    height: 1.0,
  );
}
