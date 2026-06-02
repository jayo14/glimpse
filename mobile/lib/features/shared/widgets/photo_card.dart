import 'package:flutter/material.dart';
import '../../../core/utils/responsive.dart';

class PhotoCard extends StatelessWidget {
  final String src;
  final String alt;
  final double rotation;

  const PhotoCard({
    super.key,
    required this.src,
    required this.alt,
    this.rotation = 0,
  });

  @override
  Widget build(BuildContext context) {
    return Transform.rotate(
      angle: rotation * 3.1415926535897932 / 180,
      child: Container(
        width: 240.w(context),
        height: 320.h(context),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24.h(context)),
          image: DecorationImage(
            image: NetworkImage(src),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
