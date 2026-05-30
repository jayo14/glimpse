import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'theme.dart';
import 'onboarding_screen.dart';
import 'storage_service.dart';
import '../events/landing_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToNext();
  }

  Future<void> _navigateToNext() async {
    await Future.delayed(const Duration(seconds: 3));
    if (!mounted) return;

    // Check if onboarding is completed
    // For now, let's just go to onboarding
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const OnboardingScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.ink,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              PhosphorIconsFill.aperture,
              color: GlimpseColors.primaryViola,
              size: 80,
            )
            .animate()
            .fade(duration: 1000.ms)
            .scale(delay: 500.ms, duration: 1000.ms, curve: Curves.elasticOut),
            const SizedBox(height: 24),
            Text(
              "Glimpse",
              style: Theme.of(context).textTheme.displayLarge?.copyWith(
                color: Colors.white,
                letterSpacing: 4,
              ),
            )
            .animate()
            .fade(delay: 1000.ms, duration: 800.ms)
            .slideY(begin: 0.5, end: 0, duration: 800.ms),
          ],
        ),
      ),
    );
  }
}
