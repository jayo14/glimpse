import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class GlimpseIcon extends StatelessWidget {
  final PhosphorIconData icon;
  final double? size;
  final Color? color;

  const GlimpseIcon(this.icon, {super.key, this.size, this.color});

  @override
  Widget build(BuildContext context) {
    final effectiveColor = color ?? Theme.of(context).iconTheme.color ?? Colors.white;
    return PhosphorIcon(
      icon,
      size: size,
      color: effectiveColor,
      duotoneSecondaryColor: effectiveColor.withValues(alpha: 0.2),
      duotoneSecondaryOpacity: 1.0,
    );
  }
}
