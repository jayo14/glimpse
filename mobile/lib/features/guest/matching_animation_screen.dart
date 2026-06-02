import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'dart:async';

class MatchingAnimationScreen extends StatefulWidget {
  const MatchingAnimationScreen({super.key});

  @override
  State<MatchingAnimationScreen> createState() => _MatchingAnimationScreenState();
}

class _MatchingAnimationScreenState extends State<MatchingAnimationScreen> with TickerProviderStateMixin {
  double _progress = 0;
  int _consoleIdx = 0;
  int _activeStep = 0;
  bool _done = false;

  final List<String> _consoleLines = [
    "Comparing vector coordinates with pgvector database...",
    "Running cosine similarity search (1,240 embeddings)...",
    "Filtering threshold: similarity > 0.87...",
    "Clustering matched face vectors...",
    "Sorting results by confidence score...",
    "Hydrating photo metadata from event index...",
    "Preparing secure photo delivery...",
  ];

  final List<String> _steps = [
    "Face encoding",
    "Vector search",
    "Match clustering",
    "Gallery ready",
  ];

  late AnimationController _pulseController1;
  late AnimationController _pulseController2;
  late AnimationController _sweepController;

  @override
  void initState() {
    super.initState();
    _pulseController1 = AnimationController(vsync: this, duration: const Duration(milliseconds: 3500))..repeat(reverse: true);
    _pulseController2 = AnimationController(vsync: this, duration: const Duration(milliseconds: 3500))..repeat(reverse: true);
    _sweepController = AnimationController(vsync: this, duration: const Duration(milliseconds: 1600))..repeat(reverse: true);

    _startProgress();
    _startConsoleCycle();
  }

  void _startProgress() {
    const duration = Duration(milliseconds: 4800);
    final startTime = DateTime.now();
    Timer.periodic(const Duration(milliseconds: 16), (timer) {
      final elapsed = DateTime.now().difference(startTime);
      final p = (elapsed.inMilliseconds / duration.inMilliseconds).clamp(0.0, 1.0);

      if (mounted) {
        setState(() {
          _progress = p;
          _activeStep = (p * _steps.length).floor().clamp(0, _steps.length - 1);
        });
      }

      if (p >= 1.0) {
        timer.cancel();
        setState(() {
          _done = true;
        });
        Future.delayed(const Duration(milliseconds: 900), () {
          if (mounted) context.push('/instant-reveal');
        });
      }
    });
  }

  void _startConsoleCycle() {
    Timer.periodic(const Duration(milliseconds: 680), (timer) {
      if (_done) {
        timer.cancel();
        return;
      }
      if (mounted) {
        setState(() {
          _consoleIdx = (_consoleIdx + 1) % _consoleLines.length;
        });
      }
    });
  }

  @override
  void dispose() {
    _pulseController1.dispose();
    _pulseController2.dispose();
    _sweepController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        alignment: Alignment.center,
        children: [
          // Background Pulses
          _buildPulse(_pulseController1, 380.w(context), 0.03, 0.06),
          _buildPulse(_pulseController2, 500.w(context), 0.02, 0.045, delay: 0.6),

          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Selfie Frame
              Container(
                width: 120.w(context),
                height: 120.w(context),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24.h(context)),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
                  image: const DecorationImage(
                    image: NetworkImage('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'),
                    fit: BoxFit.cover,
                  ),
                ),
                child: Stack(
                  children: [
                    if (!_done)
                      AnimatedBuilder(
                        animation: _sweepController,
                        builder: (context, child) {
                          return Positioned(
                            top: _sweepController.value * 120.w(context),
                            left: 0,
                            right: 0,
                            child: Container(
                              height: 2,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [Colors.transparent, Colors.white.withValues(alpha: 0.9), Colors.transparent],
                                ),
                                boxShadow: [
                                  BoxShadow(color: Colors.white.withValues(alpha: 0.25), blurRadius: 8, spreadRadius: 3),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    if (_done)
                      Container(
                        color: const Color(0xFF34C759).withValues(alpha: 0.18),
                        alignment: Alignment.center,
                        child: Container(
                          width: 36.w(context),
                          height: 36.w(context),
                          decoration: const BoxDecoration(color: Color(0xFF34C759), shape: BoxShape.circle),
                          child: const Icon(Icons.check, color: Colors.white, size: 18),
                        ),
                      ),
                  ],
                ),
              ),
              SizedBox(height: 32.h(context)),

              // Status Text
              Text(
                _done ? "Match found." : "Computing Face Signatures...",
                style: TextStyle(
                  fontFamily: 'EB Garamond',
                  fontSize: 26.sp(context),
                  color: _done ? const Color(0xFF34C759) : Colors.white,
                  letterSpacing: -0.02 * 26,
                  height: 1.1,
                ),
              ),
              SizedBox(height: 8.h(context)),
              SizedBox(
                height: 18.h(context),
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 220),
                  child: Text(
                    _done ? "18 matching photos found · confidence 94.2%" : _consoleLines[_consoleIdx],
                    key: ValueKey(_done ? 'done' : _consoleIdx),
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.3),
                      fontSize: 11.sp(context),
                      letterSpacing: 0.01 * 11,
                    ),
                  ),
                ),
              ),
              SizedBox(height: 28.h(context)),

              // Steps
              SizedBox(
                width: 200.w(context),
                child: Column(
                  children: List.generate(_steps.length, (i) {
                    final isActive = i == _activeStep && !_done;
                    final isComplete = _done || i < _activeStep;
                    return Padding(
                      padding: EdgeInsets.symmetric(vertical: 5.h(context)),
                      child: Row(
                        children: [
                          Container(
                            width: 7.w(context),
                            height: 7.w(context),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: isComplete ? const Color(0xFF34C759) : isActive ? Colors.white : Colors.white.withValues(alpha: 0.15),
                              boxShadow: isActive ? [BoxShadow(color: Colors.white.withValues(alpha: 0.35), blurRadius: 6, spreadRadius: 2)] :
                                        isComplete ? [BoxShadow(color: const Color(0xFF34C759).withValues(alpha: 0.4), blurRadius: 5, spreadRadius: 1)] : null,
                            ),
                          ),
                          SizedBox(width: 10.w(context)),
                          Text(
                            _steps[i],
                            style: TextStyle(
                              color: isComplete ? const Color(0xFF34C759) : isActive ? Colors.white.withValues(alpha: 0.85) : Colors.white.withValues(alpha: 0.22),
                              fontSize: 12.sp(context),
                            ),
                          ),
                          if (isComplete) ...[
                            const Spacer(),
                            const Icon(Icons.check, color: Color(0xFF34C759), size: 10),
                          ],
                        ],
                      ),
                    );
                  }),
                ),
              ),
              SizedBox(height: 36.h(context)),

              // Progress Bar
              Container(
                width: 80.w(context),
                height: 1.h(context),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(1),
                ),
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: _progress,
                  child: Container(
                    decoration: BoxDecoration(
                      color: _done ? const Color(0xFF34C759) : Colors.white,
                      borderRadius: BorderRadius.circular(1),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 10.h(context)),
              Text(
                _done ? "100%" : "${(_progress * 100).round()}%",
                style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.22),
                  fontSize: 10.sp(context),
                  letterSpacing: 0.06 * 10,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPulse(AnimationController controller, double size, double minOp, double maxOp, {double delay = 0}) {
    return AnimatedBuilder(
      animation: controller,
      builder: (context, child) {
        final val = controller.value;
        final scale = 1.0 + (delay > 0 ? (val + delay) % 1.0 : val) * 0.18;
        final opacity = minOp + (1.0 - val) * (maxOp - minOp);
        return Container(
          width: size * scale,
          height: size * scale,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: Colors.white.withValues(alpha: opacity)),
          ),
        );
      },
    );
  }
}
