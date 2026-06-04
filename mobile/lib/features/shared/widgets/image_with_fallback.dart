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
    if (src.isEmpty) {
      return _buildFallback();
    }

    return Image.network(
      src,
      width: width,
      height: height,
      fit: fit,
      errorBuilder: (context, error, stackTrace) {
        return _buildFallback();
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

  Widget _buildFallback() {
    return Image.asset(
      'assets/images/placeholder.png',
      width: width,
      height: height,
      fit: fit,
      errorBuilder: (context, error, stackTrace) {
        return Container(
          width: width,
          height: height,
          color: const Color(0xFF1A1A1C),
          alignment: Alignment.center,
          child: Opacity(
            opacity: 0.1,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.image_outlined, size: (width ?? 48) * 0.4, color: Colors.white),
                if (width != null && width! > 80) ...[
                  const SizedBox(height: 8),
                  Text(
                    alt,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white, fontSize: 10),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}
