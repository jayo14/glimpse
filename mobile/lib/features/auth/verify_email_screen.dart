import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import 'providers/auth_provider.dart';

class VerifyEmailScreen extends ConsumerStatefulWidget {
  final String token;
  const VerifyEmailScreen({super.key, required this.token});

  @override
  ConsumerState<VerifyEmailScreen> createState() => _VerifyEmailScreenState();
}

class _VerifyEmailScreenState extends ConsumerState<VerifyEmailScreen> {
  bool _isVerifying = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _verify();
    });
  }

  Future<void> _verify() async {
    try {
      await ref.read(authProvider.notifier).verifyEmail(widget.token);
      if (mounted) {
        setState(() => _isVerifying = false);
        // Automatically go to app entry point since verifying logs them in
        context.go('/guest-setup'); 
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isVerifying = false;
          _error = e.toString().replaceAll('Exception: ', '');
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Center(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (_isVerifying) ...[
                const CircularProgressIndicator(color: Colors.white),
                SizedBox(height: 24.h(context)),
                Text(
                  'Verifying your email...',
                  style: TextStyle(color: Colors.white, fontSize: 16.sp(context)),
                ),
              ] else if (_error != null) ...[
                const Icon(Icons.error_outline, color: Colors.redAccent, size: 48),
                SizedBox(height: 16.h(context)),
                Text(
                  'Verification failed',
                  style: TextStyle(fontFamily: 'EB Garamond', fontSize: 32.sp(context), color: Colors.white),
                ),
                SizedBox(height: 12.h(context)),
                Text(_error!, style: TextStyle(color: GlimpseColors.coolGray, fontSize: 14.sp(context)), textAlign: TextAlign.center),
                SizedBox(height: 32.h(context)),
                GlimpseButton(
                  label: 'Back to Log In',
                  onPressed: () => context.go('/auth'),
                  isPrimary: true,
                ),
              ]
            ],
          ),
        ),
      ),
    );
  }
}
