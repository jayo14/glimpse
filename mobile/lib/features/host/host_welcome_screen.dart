import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import 'package:go_router/go_router.dart';

class HostWelcomeScreen extends StatefulWidget {
  const HostWelcomeScreen({super.key});

  @override
  State<HostWelcomeScreen> createState() => _HostWelcomeScreenState();
}

class _HostWelcomeScreenState extends State<HostWelcomeScreen> with TickerProviderStateMixin {
  late AnimationController _fadeController;

  final List<Map<String, dynamic>> _bgCards = [
    {'top': 0.08, 'left': 0.12, 'rotate': -8, 'w': 90, 'h': 120, 'color': Colors.blueGrey.shade900},
    {'top': 0.06, 'left': 0.58, 'rotate': 6, 'w': 80, 'h': 108, 'color': Colors.indigo.shade900},
    {'top': 0.22, 'left': -0.04, 'rotate': -4, 'w': 70, 'h': 95, 'color': Colors.deepPurple.shade900},
    {'top': 0.18, 'left': 0.78, 'rotate': 9, 'w': 85, 'h': 115, 'color': Colors.blue.shade900},
    {'top': 0.68, 'left': 0.05, 'rotate': 5, 'w': 78, 'h': 105, 'color': Colors.cyan.shade900},
    {'top': 0.72, 'left': 0.70, 'rotate': -7, 'w': 88, 'h': 118, 'color': Colors.teal.shade900},
  ];

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(duration: const Duration(milliseconds: 1000), vsync: this)..forward();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          // Animated background cards
          ..._bgCards.map((card) => _buildBgCard(card)),

          // Subtle radial glow
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: Alignment.center,
                  radius: 0.7,
                  colors: [Colors.white.withValues(alpha: 0.03), Colors.transparent],
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
                  _buildAnimatedCTA(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBgCard(Map<String, dynamic> card) {
    return AnimatedBuilder(
      animation: _fadeController,
      builder: (context, child) {
        return Positioned(
          top: (card['top'] as double) * MediaQuery.of(context).size.height,
          left: (card['left'] as double) * MediaQuery.of(context).size.width,
          child: Opacity(
            opacity: 0.18 * _fadeController.value,
            child: Transform.rotate(
              angle: (card['rotate'] as int) * 3.14159 / 180,
              child: Container(
                width: (card['w'] as int).toDouble().w(context),
                height: (card['h'] as int).toDouble().h(context),
                decoration: BoxDecoration(
                  color: card['color'],
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildAnimatedIcon() {
    return FadeTransition(
      opacity: _fadeController,
      child: ScaleTransition(
        scale: CurvedAnimation(parent: _fadeController, curve: Curves.easeOutBack),
        child: Container(
          width: 72.h(context), height: 72.h(context),
          decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.06), border: Border.all(color: Colors.white.withValues(alpha: 0.1)), borderRadius: BorderRadius.circular(22.h(context))),
          child: Icon(Icons.hourglass_empty_rounded, color: Colors.white.withValues(alpha: 0.6), size: 32),
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
        child: Text('EVENT HOST', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context), letterSpacing: 0.1 * 11)),
      ),
    );
  }

  Widget _buildAnimatedHeading() {
    return FadeTransition(
      opacity: _fadeController,
      child: Text(
        'Your stage is ready.',
        textAlign: TextAlign.center,
        style: TextStyle(fontFamily: 'EB Garamond', fontSize: 42.sp(context), color: Colors.white, height: 1.08, letterSpacing: -0.025 * 42),
      ),
    );
  }

  Widget _buildAnimatedBody() {
    return FadeTransition(
      opacity: _fadeController,
      child: Text(
        'Create an event to invite guests, sync photographer galleries, and capture every candid moment — all in one place.',
        textAlign: TextAlign.center,
        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context), height: 1.65),
      ),
    );
  }

  Widget _buildAnimatedCTA() {
    return FadeTransition(
      opacity: _fadeController,
      child: GlimpseButton(
        label: 'Create an Event',
        onPressed: () => context.go('/guest-hub'), // Simulation for now
        isPrimary: true,
        icon: const Icon(Icons.add, color: Colors.black, size: 16),
      ),
    );
  }
}
