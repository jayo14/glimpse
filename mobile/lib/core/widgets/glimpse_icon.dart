import 'package:flutter/material.dart';

class GlimpseIcon extends StatelessWidget {
  final IconData icon;
  final double? size;
  final Color? color;

  const GlimpseIcon(this.icon, {super.key, this.size, this.color});

  @override
  Widget build(BuildContext context) {
    final effectiveColor = color ?? Theme.of(context).iconTheme.color ?? Colors.white;
    return Icon(
      icon,
      size: size,
      color: effectiveColor,
    );
  }
}
