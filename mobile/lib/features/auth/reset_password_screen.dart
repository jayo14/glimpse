import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import '../../core/widgets/glimpse_input.dart';
import 'providers/auth_provider.dart';

class ResetPasswordScreen extends ConsumerStatefulWidget {
  final String token;
  const ResetPasswordScreen({super.key, required this.token});

  @override
  ConsumerState<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends ConsumerState<ResetPasswordScreen> {
  final _passwordController = TextEditingController();
  final _confirmController = TextEditingController();

  bool _showPwd = false;
  bool _showConfirm = false;
  bool _isLoading = false;
  bool _isSuccess = false;

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  void _handleReset() async {
    final password = _passwordController.text;
    final confirm = _confirmController.text;

    if (password.isEmpty || confirm.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please fill all fields.')));
      return;
    }
    if (password != confirm) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Passwords do not match.')));
      return;
    }

    setState(() => _isLoading = true);
    try {
      await ref.read(authProvider.notifier).resetPassword(widget.token, password);
      if (mounted) {
        setState(() => _isSuccess = true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))));
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isSuccess) {
      return Scaffold(
        backgroundColor: GlimpseColors.deepCharcoal,
        body: Center(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.check_circle_outline, color: Colors.greenAccent, size: 64),
                SizedBox(height: 24.h(context)),
                Text(
                  'Password Reset!',
                  style: TextStyle(fontFamily: 'EB Garamond', fontSize: 36.sp(context), color: Colors.white),
                ),
                SizedBox(height: 12.h(context)),
                Text(
                  'Your password has been successfully updated. You can now log in with your new password.',
                  style: TextStyle(color: GlimpseColors.coolGray, fontSize: 14.sp(context)),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 36.h(context)),
                GlimpseButton(
                  label: 'Back to Log In',
                  onPressed: () => context.go('/auth'),
                  isPrimary: true,
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 80.h(context)),
              Text(
                'Create new password',
                style: TextStyle(
                  fontFamily: 'EB Garamond',
                  fontSize: 36.sp(context),
                  color: Colors.white,
                  letterSpacing: -0.02 * 36,
                ),
              ),
              SizedBox(height: 12.h(context)),
              Text(
                'Your new password must be different from previous used passwords.',
                style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context), height: 1.55),
              ),
              SizedBox(height: 36.h(context)),
              GlimpseInput(
                hint: 'New password',
                controller: _passwordController,
                isPassword: !_showPwd,
                suffix: GestureDetector(
                  onTap: () => setState(() => _showPwd = !_showPwd),
                  child: Text(_showPwd ? 'Hide' : 'Show', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context))),
                ),
              ),
              SizedBox(height: 16.h(context)),
              GlimpseInput(
                hint: 'Confirm password',
                controller: _confirmController,
                isPassword: !_showConfirm,
                suffix: GestureDetector(
                  onTap: () => setState(() => _showConfirm = !_showConfirm),
                  child: Text(_showConfirm ? 'Hide' : 'Show', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context))),
                ),
              ),
              SizedBox(height: 36.h(context)),
              GlimpseButton(
                label: _isLoading ? 'Resetting...' : 'Reset Password',
                onPressed: _isLoading ? () {} : _handleReset,
                isPrimary: true,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
