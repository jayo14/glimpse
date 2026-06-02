import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import '../../core/widgets/glimpse_input.dart';
import 'dart:math' as math;

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  bool _showPwd = false;
  bool _showConfirm = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header
            Padding(
              padding: EdgeInsets.only(left: 32.w(context), right: 32.w(context), top: 56.h(context), bottom: 20.h(context)),
              child: Row(
                children: [
                  GestureDetector(
                    onTap: () => context.pop(),
                    child: Container(
                      width: 36.h(context),
                      height: 36.h(context),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.06),
                        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.chevron_left, color: Colors.white, size: 20),
                    ),
                  ),
                  SizedBox(width: 16.w(context)),
                  Text(
                    'Create account',
                    style: TextStyle(
                      fontFamily: 'EB Garamond',
                      fontSize: 30.sp(context),
                      color: Colors.white,
                      letterSpacing: -0.02 * 30,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),

            Padding(
              padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
              child: Column(
                children: [
                  // Scatter cards
                  const SignupScatterCards(),
                  SizedBox(height: 24.h(context)),

                  // Tagline
                  Text(
                    'Join Glimpse to capture, organise, and share your most candid moments.',
                    style: TextStyle(
                      color: GlimpseColors.coolGray,
                      fontSize: 13.sp(context),
                      height: 1.55,
                    ),
                  ),
                  SizedBox(height: 24.h(context)),

                  // Fields
                  GlimpseInput(hint: 'Email address'),
                  SizedBox(height: 12.h(context)),
                  GlimpseInput(
                    hint: 'Password',
                    isPassword: !_showPwd,
                    suffix: GestureDetector(
                      onTap: () => setState(() => _showPwd = !_showPwd),
                      child: Text(
                        _showPwd ? 'Hide' : 'Show',
                        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context)),
                      ),
                    ),
                  ),
                  SizedBox(height: 12.h(context)),
                  GlimpseInput(
                    hint: 'Confirm password',
                    isPassword: !_showConfirm,
                    suffix: GestureDetector(
                      onTap: () => setState(() => _showConfirm = !_showConfirm),
                      child: Text(
                        _showConfirm ? 'Hide' : 'Show',
                        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context)),
                      ),
                    ),
                  ),
                  SizedBox(height: 12.h(context)),

                  // Terms
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: 8.h(context)),
                    child: Text.rich(
                      TextSpan(
                        text: "By continuing you agree to Glimpse's ",
                        children: [
                          TextSpan(text: 'Terms of Service', style: TextStyle(color: Colors.white)),
                          TextSpan(text: ' and '),
                          TextSpan(text: 'Privacy Policy', style: TextStyle(color: Colors.white)),
                          TextSpan(text: '.'),
                        ],
                      ),
                      textAlign: TextAlign.center,
                      style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context), height: 1.6),
                    ),
                  ),
                  SizedBox(height: 12.h(context)),

                  // Primary CTA
                  GlimpseButton(
                    label: 'Create account',
                    onPressed: () => context.go('/guest-setup'),
                    isPrimary: true,
                  ),
                  SizedBox(height: 16.h(context)),

                  // Divider
                  Row(
                    children: [
                      Expanded(child: Divider(color: Color(0xFF2C2C2E), height: 1)),
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 12.w(context)),
                        child: Text('or', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context))),
                      ),
                      Expanded(child: Divider(color: Color(0xFF2C2C2E), height: 1)),
                    ],
                  ),
                  SizedBox(height: 16.h(context)),

                  // Google
                  GlimpseButton(
                    label: 'Continue with Google',
                    onPressed: () {},
                    isPrimary: false,
                    icon: Image.network('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', width: 18, height: 18, errorBuilder: (c,e,s) => const SizedBox(width: 18, height: 18)),
                  ),
                  SizedBox(height: 12.h(context)),

                  // Login link
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Already have an account? ",
                        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context)),
                      ),
                      GestureDetector(
                        onTap: () => context.pop(),
                        child: Text(
                          'Log in',
                          style: TextStyle(color: Colors.white, fontSize: 12.sp(context)),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 40.h(context)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SignupScatterCards extends StatelessWidget {
  const SignupScatterCards({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: SizedBox(
        height: 172.h(context),
        child: Stack(
          alignment: Alignment.center,
          children: [
            _Card(rotation: -9, offset: const Offset(-72, 10), src: 'https://images.unsplash.com/photo-1740139829004-c14cba0b8723?w=400', zIndex: 1),
            _Card(rotation: 10, offset: const Offset(72, 6), src: 'https://images.unsplash.com/photo-1520639933053-bc786aeaaeff?w=400', zIndex: 2),
            _Card(rotation: 1, offset: const Offset(0, -8), src: 'https://images.unsplash.com/photo-1759853900346-8d1ee0af7ca8?w=400', zIndex: 3),
          ],
        ),
      ),
    );
  }
}

class _Card extends StatelessWidget {
  final double rotation;
  final Offset offset;
  final String src;
  final int zIndex;

  const _Card({required this.rotation, required this.offset, required this.src, required this.zIndex});

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: Offset(offset.dx.w(context), offset.dy.h(context)),
      child: Transform.rotate(
        angle: rotation * math.pi / 180,
        child: Container(
          width: 96.w(context),
          height: 148.h(context),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16.h(context)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
            image: DecorationImage(image: NetworkImage(src), fit: BoxFit.cover),
          ),
        ),
      ),
    );
  }
}
