import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/theme/typography.dart';
import '../../core/utils/responsive.dart';
import 'package:go_router/go_router.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _progressAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(duration: const Duration(milliseconds: 2800), vsync: this);
    _progressAnimation = CurvedAnimation(parent: _controller, curve: const Cubic(0, 0, 0.2, 1));
    _controller.forward().then((_) {
      Future.delayed(const Duration(milliseconds: 300), () {
        if (mounted) context.go('/auth');
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        alignment: Alignment.center,
        children: [
          CustomPaint(painter: LensPainter(), size: Size.infinite),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Glimpse', style: GlimpseTypography.heading.copyWith(fontSize: 56.sp(context))),
              SizedBox(height: 44.h(context)),
              Text('CANDID. CAPTURED. DELIVERED.', style: GlimpseTypography.tagline.copyWith(fontSize: 11.sp(context))),
            ],
          ),
          Positioned(
            bottom: 52.h(context),
            child: Container(
              width: 80.w(context),
              height: 1.h(context),
              color: Colors.white.withValues(alpha: 0.12),
              child: AnimatedBuilder(
                animation: _progressAnimation,
                builder: (context, child) {
                  return FractionallySizedBox(
                    alignment: Alignment.centerLeft,
                    widthFactor: _progressAnimation.value,
                    child: Container(color: Colors.white),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class LensPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final ghostPaint = Paint()
      ..shader = RadialGradient(
        colors: [Colors.white.withValues(alpha: 0.06), Colors.white.withValues(alpha: 0.02), Colors.transparent],
        stops: const [0.0, 0.4, 0.7],
      ).createShader(Rect.fromCircle(center: center, radius: 210));
    canvas.drawCircle(center, 210, ghostPaint);
    final ringPaint = Paint()..style = PaintingStyle.stroke..strokeWidth = 1;
    ringPaint.color = Colors.white.withValues(alpha: 0.025);
    canvas.drawCircle(center, 130, ringPaint);
    ringPaint.color = Colors.white.withValues(alpha: 0.015);
    canvas.drawCircle(center, 180, ringPaint);
  }
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
