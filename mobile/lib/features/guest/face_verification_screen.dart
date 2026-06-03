import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';

class FaceVerificationScreen extends StatelessWidget {
  const FaceVerificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          // Background Gradient
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Color(0x0DFFFFFF), Colors.transparent],
              ),
            ),
          ),

          Padding(
            padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: 100.h(context)),
                // Selfie frame
                Container(
                  width: 180.w(context),
                  height: 180.w(context),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withValues(alpha: 0.15), width: 2),
                    image: const DecorationImage(
                      image: NetworkImage('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                SizedBox(height: 48.h(context)),

                Text(
                  'Verify it\'s you.',
                  style: TextStyle(
                    fontFamily: 'EB Garamond',
                    fontSize: 42.sp(context),
                    color: Colors.white,
                    letterSpacing: -0.02 * 42,
                    height: 1.1,
                  ),
                ),
                SizedBox(height: 16.h(context)),
                Text(
                  'We use this photo to find you in the event gallery. It’s never shared and deleted after the event.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: GlimpseColors.coolGray,
                    fontSize: 14.sp(context),
                    height: 1.6,
                  ),
                ),
                const Spacer(),

                GestureDetector(
                  onTap: () => context.push('/matching-animation'),
                  child: Container(
                    width: double.infinity,
                    padding: EdgeInsets.symmetric(vertical: 16.h(context)),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      'Confirm & Find Photos',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 16.sp(context),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 12.h(context)),
                GestureDetector(
                  onTap: () => context.pop(),
                  child: Container(
                    width: double.infinity,
                    padding: EdgeInsets.symmetric(vertical: 16.h(context)),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
                      borderRadius: BorderRadius.circular(999),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      'Retake Photo',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16.sp(context),
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 52.h(context)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
