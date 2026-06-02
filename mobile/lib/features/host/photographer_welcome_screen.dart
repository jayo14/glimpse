import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import 'package:go_router/go_router.dart';

class PhotographerWelcomeScreen extends StatefulWidget {
  const PhotographerWelcomeScreen({super.key});

  @override
  State<PhotographerWelcomeScreen> createState() => _PhotographerWelcomeScreenState();
}

class _PhotographerWelcomeScreenState extends State<PhotographerWelcomeScreen> with TickerProviderStateMixin {
  late AnimationController _fadeController;
  late AnimationController _rotateController;

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(duration: const Duration(milliseconds: 1000), vsync: this)..forward();
    _rotateController = AnimationController(duration: const Duration(seconds: 28), vsync: this)..repeat();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _rotateController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          // Aperture rings
          ..._buildApertureRings(),

          // Radial glow
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: Alignment.center,
                  radius: 0.7,
                  colors: [Colors.white.withValues(alpha: 0.04), Colors.transparent],
                ),
              ),
            ),
          ),

          // Back button
          Positioned(
            top: 52.h(context),
            left: 24.w(context),
            child: GestureDetector(
              onTap: () => context.pop(),
              child: Container(
                width: 36.h(context), height: 36.h(context),
                decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: 0.09)), shape: BoxShape.circle),
                child: const Icon(Icons.chevron_left, color: Colors.white, size: 16),
              ),
            ),
          ),

          // Central content
          Center(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 36.w(context)),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _buildAnimatedIcon(),
                  SizedBox(height: 28.h(context)),
                  _buildAnimatedTag(),
                  SizedBox(height: 16.h(context)),
                  _buildAnimatedHeading(),
                  SizedBox(height: 14.h(context)),
                  _buildAnimatedBody(),
                  SizedBox(height: 44.h(context)),
                  _buildAnimatedCTAs(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildApertureRings() {
    return [
      _ApertureRing(controller: _rotateController, size: 420, opacity: 0.04, delay: 0),
      _ApertureRing(controller: _rotateController, size: 300, opacity: 0.06, delay: 0.12),
      _ApertureRing(controller: _rotateController, size: 200, opacity: 0.08, delay: 0.24),
      _ApertureRing(controller: _rotateController, size: 110, opacity: 0.10, delay: 0.36),
    ];
  }

  Widget _buildAnimatedIcon() {
    return FadeTransition(
      opacity: _fadeController,
      child: ScaleTransition(
        scale: CurvedAnimation(parent: _fadeController, curve: Curves.easeOutBack),
        child: Container(
          width: 72.h(context), height: 72.h(context),
          decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.06), border: Border.all(color: Colors.white.withValues(alpha: 0.1)), borderRadius: BorderRadius.circular(22.h(context))),
          child: Icon(Icons.camera_alt_outlined, color: Colors.white.withValues(alpha: 0.6), size: 34),
        ),
      ),
    );
  }

  Widget _buildAnimatedTag() {
    return FadeTransition(
      opacity: _fadeController,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 14.w(context), vertical: 5.h(context)),
        decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.04), border: Border.all(color: Colors.white.withValues(alpha: 0.1)), borderRadius: BorderRadius.circular(999)),
        child: Text('PHOTOGRAPHER', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context), letterSpacing: 0.1 * 11)),
      ),
    );
  }

  Widget _buildAnimatedHeading() {
    return FadeTransition(
      opacity: _fadeController,
      child: Text(
        'Frame every moment.',
        textAlign: TextAlign.center,
        style: TextStyle(fontFamily: 'EB Garamond', fontSize: 42.sp(context), color: Colors.white, height: 1.08, letterSpacing: -0.025 * 42),
      ),
    );
  }

  Widget _buildAnimatedBody() {
    return FadeTransition(
      opacity: _fadeController,
      child: Text(
        'Launch your own shoot, or join an existing event with a code or QR scan to start delivering matched pro galleries instantly.',
        textAlign: TextAlign.center,
        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context), height: 1.65),
      ),
    );
  }

  Widget _buildAnimatedCTAs() {
    return FadeTransition(
      opacity: _fadeController,
      child: Column(
        children: [
          GlimpseButton(
            label: 'Create an Event',
            onPressed: () => context.go('/guest-hub'),
            isPrimary: true,
            icon: const Icon(Icons.add, color: Colors.black, size: 15),
          ),
          SizedBox(height: 12.h(context)),
          GlimpseButton(
            label: 'Join via Code or QR',
            onPressed: () => context.go('/guest-entry'),
            isPrimary: false,
            icon: const Icon(Icons.qr_code_scanner, color: Colors.white, size: 15),
          ),
        ],
      ),
    );
  }
}

class _ApertureRing extends StatelessWidget {
  final AnimationController controller;
  final double size;
  final double opacity;
  final double delay;

  const _ApertureRing({required this.controller, required this.size, required this.opacity, required this.delay});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: RotationTransition(
        turns: controller,
        child: Container(
          width: size.h(context),
          height: size.h(context),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: Colors.white.withValues(alpha: opacity * 5), width: 1),
          ),
        ),
      ),
    );
  }
}
