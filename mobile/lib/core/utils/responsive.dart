import 'package:flutter/widgets.dart';

class Responsive {
  static const double baseWidth = 390.0;
  static const double baseHeight = 844.0;

  static double scale(BuildContext context, double value) {
    final width = MediaQuery.of(context).size.width;
    return value * (width / baseWidth);
  }

  static double scaleHeight(BuildContext context, double value) {
    final height = MediaQuery.of(context).size.height;
    return value * (height / baseHeight);
  }

  static double scaleFont(BuildContext context, double value) {
    return scale(context, value);
  }
}

extension ResponsiveExtension on num {
  double w(BuildContext context) => Responsive.scale(context, toDouble());
  double h(BuildContext context) => Responsive.scaleHeight(context, toDouble());
  double sp(BuildContext context) => Responsive.scaleFont(context, toDouble());
}
