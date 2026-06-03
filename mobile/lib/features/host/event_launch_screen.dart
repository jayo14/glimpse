import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'dart:async';

class EventLaunchScreen extends StatefulWidget {
  const EventLaunchScreen({super.key});

  @override
  State<EventLaunchScreen> createState() => _EventLaunchScreenState();
}

class _EventLaunchScreenState extends State<EventLaunchScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 3), () {
      if (mounted) context.go('/photographer-dashboard');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 120.w(context),
              height: 120.w(context),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.05),
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
              ),
              child: const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  strokeWidth: 2,
                ),
              ),
            ),
            SizedBox(height: 48.h(context)),
            Text(
              'Launching your event...',
              style: TextStyle(
                fontFamily: 'EB Garamond',
                fontSize: 32.sp(context),
                color: Colors.white,
                letterSpacing: -0.02 * 32,
              ),
            ),
            SizedBox(height: 12.h(context)),
            Text(
              'Preparing your digital portal',
              style: TextStyle(
                color: GlimpseColors.coolGray,
                fontSize: 14.sp(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
