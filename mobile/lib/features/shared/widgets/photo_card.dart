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
          color: const Color(0xFF1A1A1C),
          image: DecorationImage(
            image: NetworkImage(src),
            fit: BoxFit.cover,
            onError: (exception, stackTrace) {
              // Silently handle error, container background will show
            },
          ),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.3),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Stack(
          children: [
            // If image fails, show placeholder icon
            Center(
              child: Opacity(
                opacity: 0.05,
                child: Icon(Icons.image_outlined, size: 48.sp(context), color: Colors.white),
              ),
            ),
            // The image itself is handled by DecorationImage
          ],
        ),
      ),
    );
  }
}
