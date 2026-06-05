import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import '../../core/widgets/glimpse_input.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_flutter/lucide_flutter.dart';
import 'package:go_router/go_router.dart';
import 'providers/auth_provider.dart';

class ForgotPasswordScreen extends ConsumerStatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  ConsumerState<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends ConsumerState<ForgotPasswordScreen> {
  final TextEditingController _emailController = TextEditingController();
  bool _isSent = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  void _handleSendResetLink() async {
    final email = _emailController.text.trim();
    if (email.isEmpty) return;

    setState(() => _isLoading = true);
    try {
      await ref.read(authProvider.notifier).forgotPassword(email);
      if (mounted) {
        setState(() => _isSent = true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Padding(
            padding: EdgeInsets.only(left: 28.w(context), top: 56.h(context)),
            child: GestureDetector(
              onTap: () => context.pop(),
              child: Container(
                width: 36.h(context),
                height: 36.h(context),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.06),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.chevron_left, color: Colors.white, size: 17),
              ),
            ),
          ),

          Expanded(
            child: Padding(
              padding: EdgeInsets.fromLTRB(28.w(context), 0, 28.w(context), 80.h(context)),
              child: Center(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: _isSent ? _buildSuccessState() : _buildEmailState(),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildEmailState() {
    return [
      Text(
        'Reset your password.',
        style: TextStyle(
          fontFamily: 'EB Garamond',
          fontSize: 40.sp(context),
          color: Colors.white,
          letterSpacing: -0.02 * 40,
          height: 1.1,
          fontWeight: FontWeight.w400,
        ),
      ),
      SizedBox(height: 12.h(context)),
      Text(
        "Enter the email address linked to your Glimpse account and we'll send you a reset link.",
        style: TextStyle(
          color: GlimpseColors.coolGray,
          fontSize: 13.sp(context),
          height: 1.6,
        ),
      ),
      SizedBox(height: 36.h(context)),
      GlimpseInput(
        controller: _emailController,
        hint: 'Enter your email address',
        keyboardType: TextInputType.emailAddress,
        suffix: Padding(
          padding: EdgeInsets.only(right: 8.w(context)),
          child: Icon(LucideIcons.mail, color: Colors.white.withValues(alpha: 0.25), size: 22),
        ),
      ),
      SizedBox(height: 16.h(context)),
      GlimpseButton(
        label: _isLoading ? 'Sending...' : 'Send Reset Link',
        onPressed: _isLoading ? () {} : _handleSendResetLink,
        isDisabled: _emailController.text.trim().isEmpty || _isLoading,
      ),
      SizedBox(height: 24.h(context)),
      Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Remember your password? ', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context))),
            GestureDetector(
              onTap: () => context.pop(),
              child: const Text('Log in', style: TextStyle(color: Colors.white, fontSize: 12)),
            ),
          ],
        ),
      ),
    ];
  }

  List<Widget> _buildSuccessState() {
    return [
      Container(
        width: 64.h(context),
        height: 64.h(context),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.06),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
          borderRadius: BorderRadius.circular(18.h(context)),
        ),
        child: const Icon(Icons.check, color: Colors.white, size: 28),
      ),
      SizedBox(height: 28.h(context)),
      Text(
        'Check your inbox.',
        style: TextStyle(
          fontFamily: 'EB Garamond',
          fontSize: 38.sp(context),
          color: Colors.white,
          letterSpacing: -0.02 * 38,
          height: 1.1,
          fontWeight: FontWeight.w400,
        ),
      ),
      SizedBox(height: 12.h(context)),
      Text(
        "We've sent a reset link to",
        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context), height: 1.6),
      ),
      SizedBox(height: 8.h(context)),
      Text(
        _emailController.text,
        style: TextStyle(color: Colors.white, fontSize: 14.sp(context), fontWeight: FontWeight.w500),
      ),
      SizedBox(height: 36.h(context)),
      // Dashed divider simulation
      Container(
        height: 1,
        width: double.infinity,
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: Colors.white.withValues(alpha: 0.12),
              width: 1,
              style: BorderStyle.solid, // Flutter doesn't have native dashed, will use solid or custom paint
            ),
          ),
        ),
      ),
      SizedBox(height: 28.h(context)),
      Text.rich(
        TextSpan(
          text: "Didn't receive it? Check your spam folder, or ",
          children: [
            WidgetSpan(
              child: GestureDetector(
                onTap: () => setState(() => _isSent = false),
                child: const Text('try another address', style: TextStyle(color: Colors.white, fontSize: 12)),
              ),
            ),
            const TextSpan(text: '.'),
          ],
        ),
        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context), height: 1.6),
      ),
      SizedBox(height: 28.h(context)),
      GlimpseButton(
        label: 'Back to Log In',
        onPressed: () => context.pop(),
        isPrimary: true,
      ),
    ];
  }
}
