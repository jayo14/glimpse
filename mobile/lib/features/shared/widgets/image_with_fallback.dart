import 'package:flutter/material.dart';

class ImageWithFallback extends StatelessWidget {
  final String src;
  final String alt;
  final BoxFit fit;
  final double? width;
  final double? height;

  const ImageWithFallback({
    super.key,
    required this.src,
    required this.alt,
    this.fit = BoxFit.cover,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Image.network(
      src,
      width: width,
      height: height,
      fit: fit,
      errorBuilder: (context, error, stackTrace) {
        return Container(
          width: width,
          height: height,
          color: Colors.grey[200],
          alignment: Alignment.center,
          child: Opacity(
            opacity: 0.3,
            child: Icon(Icons.image_not_supported, size: (width ?? 24) * 0.5),
          ),
        );
      },
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return Container(
          width: width,
          height: height,
          color: Colors.white.withValues(alpha: 0.05),
          child: const Center(
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white24),
            ),
          ),
        );
      },
    );
  }
}
