import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import '../../core/widgets/glimpse_input.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'dart:math' as math;
import 'providers/auth_provider.dart';

class AuthScreen extends ConsumerStatefulWidget {
  const AuthScreen({super.key});

  @override
  ConsumerState<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends ConsumerState<AuthScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _showPassword = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter both email and password.')),
      );
      return;
    }

    try {
      await ref.read(authProvider.notifier).login(email, password);
      if (mounted && ref.read(authProvider).hasValue && ref.read(authProvider).value != null) {
        context.go('/guest-setup');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 56.h(context)),
              const ScatterCards(),
              SizedBox(height: 28.h(context)),
              const AuthHeading(),
              SizedBox(height: 24.h(context)),
              GlimpseInput(
                hint: 'Enter your email address',
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 12.h(context)),
              GlimpseInput(
                hint: 'Enter your password',
                controller: _passwordController,
                isPassword: !_showPassword,
                suffix: GestureDetector(
                  onTap: () => setState(() => _showPassword = !_showPassword),
                  child: Text(
                    _showPassword ? 'Hide' : 'Show',
                    style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context)),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: GestureDetector(
                  onTap: () => context.push('/forgot-password'),
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 8.h(context)),
                    child: Text(
                      'Forgot password?',
                      style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context)),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 12.h(context)),
              GlimpseButton(
                label: authState.isLoading ? 'Logging in...' : 'Continue',
                onPressed: authState.isLoading ? () {} : _handleLogin,
                isPrimary: true,
              ),
              SizedBox(height: 12.h(context)),
              GlimpseButton(
                label: 'Continue with Google',
                onPressed: () {},
                isPrimary: false,
              ),
              SizedBox(height: 12.h(context)),
              TextButton(
                onPressed: () => context.go('/guest-entry'),
                child: Text(
                  'Continue as Guest',
                  style: TextStyle(color: Colors.white.withValues(alpha: 0.38), fontSize: 13.sp(context)),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 8.h(context)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Don't have an account? ", style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context))),
                    GestureDetector(
                      onTap: () => context.push('/signup'),
                      child: Text('Sign up', style: TextStyle(color: Colors.white, fontSize: 12.sp(context))),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 40.h(context)),
            ],
          ),
        ),
      ),
    );
  }
}

class ScatterCards extends StatelessWidget {
  const ScatterCards({super.key});

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: SizedBox(
        height: 188.h(context),
        child: Stack(
          alignment: Alignment.center,
          children: [
            _Card(rotation: -8, offset: const Offset(-80, 12), src: 'https://images.unsplash.com/photo-1649583501954-c2dcf50e0553?w=400', zIndex: 1),
            _Card(rotation: 11, offset: const Offset(80, 8), src: 'https://images.unsplash.com/photo-1742890184672-3ac8f37095cb?w=400', zIndex: 2),
            _Card(rotation: 2, offset: const Offset(0, -6), src: 'https://images.unsplash.com/photo-1520639933053-bc786aeaaeff?w=400', zIndex: 3),
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
          width: 100.w(context),
          height: 160.h(context),
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

class AuthHeading extends StatelessWidget {
  const AuthHeading({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Welcome to Glimpse',
            style: TextStyle(
              fontFamily: 'EB Garamond',
              fontSize: 36.sp(context),
              color: Colors.white,
              letterSpacing: -0.02 * 36,
              height: 1.1,
            ),
          ),
          SizedBox(height: 10.h(context)),
          Text(
            'Log in to manage your events, sync professional galleries, or review live guest candids.',
            style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context), height: 1.55),
          ),
        ],
      ),
    );
  }
}
