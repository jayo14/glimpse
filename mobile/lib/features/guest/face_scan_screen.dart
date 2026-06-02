import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'dart:math' as math;
import 'dart:async';

class FaceScanScreen extends StatefulWidget {
  const FaceScanScreen({super.key});

  @override
  State<FaceScanScreen> createState() => _FaceScanScreenState();
}

class _FaceScanScreenState extends State<FaceScanScreen> with TickerProviderStateMixin {
  double _progress = 0;
  bool _scanning = false;
  bool _done = false;
  bool _flash = false;
  late AnimationController _sweepController;

  @override
  void initState() {
    super.initState();
    _sweepController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
  }

  @override
  void dispose() {
    _sweepController.dispose();
    super.dispose();
  }

  void _handleShutter() {
    if (_scanning || _done) return;
    setState(() {
      _scanning = true;
    });
    _sweepController.repeat();

    const duration = Duration(milliseconds: 2400);
    final startTime = DateTime.now();

    Timer.periodic(const Duration(milliseconds: 16), (timer) {
      final elapsed = DateTime.now().difference(startTime);
      final p = math.min(elapsed.inMilliseconds / duration.inMilliseconds, 1.0);

      if (mounted) {
        setState(() {
          _progress = p;
        });
      }

      if (p >= 1.0) {
        timer.cancel();
        _sweepController.stop();
        setState(() {
          _flash = true;
        });
        Future.delayed(const Duration(milliseconds: 180), () {
          if (mounted) {
            setState(() {
              _flash = false;
              _done = true;
            });
          }
          Future.delayed(const Duration(milliseconds: 900), () {
            if (mounted) {
              context.push('/face-verification');
            }
          });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final diameter = 280.w(context);

    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        alignment: Alignment.center,
        children: [
          // Background Gradient
          Container(
            decoration: const BoxDecoration(
              gradient: RadialGradient(
                center: Alignment(0, -0.2),
                radius: 0.65,
                colors: [Color(0x08FFFFFF), Colors.transparent],
              ),
            ),
          ),

          if (_flash)
            Container(color: Colors.white.withValues(alpha: 0.3)),

          // Top HUD
          Positioned(
            top: 52.h(context),
            left: 20.w(context),
            right: 20.w(context),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                GestureDetector(
                  onTap: () => context.pop(),
                  child: Container(
                    width: 38.h(context),
                    height: 38.h(context),
                    decoration: BoxDecoration(
                      color: const Color(0x99141416),
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
                    ),
                    child: const Icon(Icons.close, color: Colors.white, size: 18),
                  ),
                ),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 14.w(context), vertical: 6.h(context)),
                  decoration: BoxDecoration(
                    color: const Color(0x8C141416),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.12)),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.shield_outlined, color: Colors.white.withValues(alpha: 0.4), size: 10.sp(context)),
                      SizedBox(width: 7.w(context)),
                      Text(
                        'SECURE · NOT STORED',
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.4),
                          fontSize: 10.sp(context),
                          letterSpacing: 0.08 * 10,
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(width: 38.h(context)),
              ],
            ),
          ),

          // Viewfinder
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  width: diameter,
                  height: diameter,
                  child: Stack(
                    children: [
                      // Simulated Camera feed (placeholder)
                      Container(
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.black.withValues(alpha: 0.5),
                          image: const DecorationImage(
                            image: NetworkImage('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      // Inner vignette
                      Container(
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            colors: [Colors.transparent, Colors.black.withValues(alpha: 0.45)],
                            stops: const [0.45, 1.0],
                          ),
                        ),
                      ),
                      // Face Silhouette
                      Center(
                        child: CustomPaint(
                          size: Size(diameter * 0.6, diameter * 0.7),
                          painter: FaceSilhouettePainter(),
                        ),
                      ),
                      // Progress Ring
                      SizedBox.expand(
                        child: CustomPaint(
                          painter: ProgressRingPainter(
                            progress: _progress,
                            isDone: _done,
                          ),
                        ),
                      ),
                      // Scan Sweep Line
                      if (_scanning && !_done)
                        AnimatedBuilder(
                          animation: _sweepController,
                          builder: (context, child) {
                            return Positioned(
                              top: 20 + (diameter - 40) * _sweepController.value,
                              left: 20,
                              right: 20,
                              child: Container(
                                height: 2,
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: [
                                      Colors.transparent,
                                      Colors.white.withValues(alpha: 0.75),
                                      Colors.transparent
                                    ],
                                  ),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.white.withValues(alpha: 0.2),
                                      blurRadius: 8,
                                      spreadRadius: 2,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      // Done Checkmark
                      if (_done)
                        Center(
                          child: Container(
                            width: 60.w(context),
                            height: 60.w(context),
                            decoration: const BoxDecoration(
                              color: Color(0xFF34C759),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.check, color: Colors.white, size: 32),
                          ),
                        ),
                    ],
                  ),
                ),
                SizedBox(height: 40.h(context)),
                Text(
                  _done ? "Face signature captured" : _scanning ? "Hold still…" : "Align your face inside the frame",
                  style: TextStyle(
                    color: _done ? const Color(0xDA34C759) : Colors.white.withValues(alpha: 0.5),
                    fontSize: 14.sp(context),
                    letterSpacing: 0.01 * 14,
                  ),
                ),
                SizedBox(height: 10.h(context)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(3, (i) => Container(
                    margin: const EdgeInsets.symmetric(horizontal: 2.5),
                    width: 4,
                    height: 4,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _done ? const Color(0xFF34C759) : _scanning ? Colors.white : Colors.white.withValues(alpha: 0.2),
                    ),
                  )),
                ),
              ],
            ),
          ),

          // Shutter Button
          Positioned(
            bottom: 52.h(context),
            child: GestureDetector(
              onTap: _handleShutter,
              child: Container(
                width: 80.w(context),
                height: 80.w(context),
                decoration: BoxDecoration(
                  color: _done ? const Color(0xFF34C759) : Colors.white,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.black.withValues(alpha: 0.3), width: 3),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(4),
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white.withValues(alpha: 0.5), width: 2.5),
                    ),
                    child: _done ? const Icon(Icons.check, color: Colors.white, size: 24) : null,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ProgressRingPainter extends CustomPainter {
  final double progress;
  final bool isDone;

  ProgressRingPainter({required this.progress, required this.isDone});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width / 2) - 1;

    final bgPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.18)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;

    canvas.drawCircle(center, radius, bgPaint);

    final progressPaint = Paint()
      ..color = isDone ? const Color(0xFF34C759) : Colors.white
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      2 * math.pi * progress,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(ProgressRingPainter oldDelegate) =>
    oldDelegate.progress != progress || oldDelegate.isDone != isDone;
}

class FaceSilhouettePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.1
      ..strokeCap = StrokeCap.round;

    final w = size.width;
    final h = size.height;

    // Face outline (U-shape)
    final path = Path()
      ..moveTo(0, h * 0.3)
      ..relativeQuadraticBezierTo(0, h * 0.5, w, 0);
    canvas.drawPath(path, paint);

    // Eyes
    canvas.drawOval(Rect.fromCenter(center: Offset(w * 0.35, h * 0.45), width: w * 0.15, height: h * 0.1), paint);
    canvas.drawOval(Rect.fromCenter(center: Offset(w * 0.65, h * 0.45), width: w * 0.15, height: h * 0.1), paint);

    // Nose
    final nosePath = Path()
      ..moveTo(w * 0.5, h * 0.5)
      ..lineTo(w * 0.45, h * 0.65)
      ..relativeQuadraticBezierTo(w * 0.05, h * 0.03, w * 0.1, 0)
      ..lineTo(w * 0.5, h * 0.5);
    canvas.drawPath(nosePath, paint);

    // Mouth
    final mouthPath = Path()
      ..moveTo(w * 0.4, h * 0.75)
      ..relativeQuadraticBezierTo(w * 0.1, h * 0.07, w * 0.2, 0);
    canvas.drawPath(mouthPath, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
