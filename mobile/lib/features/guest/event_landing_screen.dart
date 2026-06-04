import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';

class EventLandingScreen extends StatelessWidget {
  const EventLandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          // Hero Background Image
          Positioned.fill(
            child: Image.network(
              'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
              fit: BoxFit.cover, errorBuilder: (c,e,s) => Container(color: Colors.black, child: const Center(child: Icon(Icons.image_outlined, color: Colors.white10, size: 64))),
            ),
          ),
          // Dark Gradient Overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withValues(alpha: 0.3),
                    Colors.black.withValues(alpha: 0.8),
                  ],
                ),
              ),
            ),
          ),

          Padding(
            padding: EdgeInsets.symmetric(horizontal: 24.w(context)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: 60.h(context)),
                // Event Badge
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 12.w(context), vertical: 6.h(context)),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
                  ),
                  child: Text(
                    'WEDDING EVENT',
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.7),
                      fontSize: 10.sp(context),
                      letterSpacing: 0.12 * 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                const Spacer(),
                Text(
                  'Sarah & David',
                  style: TextStyle(
                    fontFamily: 'EB Garamond',
                    fontSize: 48.sp(context),
                    color: Colors.white,
                    letterSpacing: -0.02 * 48,
                    height: 1.0,
                  ),
                ),
                Text(
                  'The Wedding Celebration',
                  style: TextStyle(
                    fontFamily: 'EB Garamond',
                    fontSize: 24.sp(context),
                    color: Colors.white.withValues(alpha: 0.6),
                    height: 1.2,
                  ),
                ),
                SizedBox(height: 24.h(context)),
                Text(
                  'Welcome to our digital memory book. Every candid moment, captured and delivered to you instantly.',
                  style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.8),
                    fontSize: 15.sp(context),
                    height: 1.5,
                  ),
                ),
                SizedBox(height: 40.h(context)),

                _buildButton(
                  context,
                  '✨ Find My Photos',
                  Colors.white,
                  Colors.black,
                  () => context.push('/face-scan')
                ),
                SizedBox(height: 12.h(context)),
                _buildButton(
                  context,
                  '📷 Open Candid Lens',
                  Colors.transparent,
                  Colors.white,
                  () => context.push('/viewfinder'),
                  borderColor: Colors.white.withValues(alpha: 0.22)
                ),
                SizedBox(height: 52.h(context)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildButton(BuildContext context, String label, Color bgColor, Color textColor, VoidCallback onTap, {Color? borderColor}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.symmetric(vertical: 16.h(context)),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(999),
          border: borderColor != null ? Border.all(color: borderColor) : null,
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(
            color: textColor,
            fontSize: 15.sp(context),
            fontWeight: bgColor == Colors.white ? FontWeight.w700 : FontWeight.w400,
            letterSpacing: 0.01 * 15,
          ),
        ),
      ),
    );
  }
}
