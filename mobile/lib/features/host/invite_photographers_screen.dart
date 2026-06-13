import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'providers/event_provider.dart';

class InvitePhotographersScreen extends ConsumerStatefulWidget {
  const InvitePhotographersScreen({super.key});

  @override
  ConsumerState<InvitePhotographersScreen> createState() => _InvitePhotographersScreenState();
}

class _InvitePhotographersScreenState extends ConsumerState<InvitePhotographersScreen> {
  final TextEditingController _emailController = TextEditingController();
  bool _isInviting = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleInvite() async {
    final email = _emailController.text.trim();
    if (email.isEmpty) return;

    final event = ref.read(eventProvider).value;
    if (event == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No active event context found')),
      );
      return;
    }

    setState(() => _isInviting = true);
    try {
      await ref.read(eventProvider.notifier).addCollaborator(event.id, email);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invite sent successfully')),
        );
        _emailController.clear();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to send invite: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isInviting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.w(context)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTopBar(context),
              SizedBox(height: 48.h(context)),
              Text(
                'Invite professional photographers.',
                style: TextStyle(
                  fontFamily: 'EB Garamond',
                  fontSize: 38.sp(context),
                  color: Colors.white,
                  height: 1.1,
                  letterSpacing: -0.02 * 38,
                ),
              ),
              SizedBox(height: 16.h(context)),
              Text(
                'Add photographers to your event to sync their high-quality captures directly to your guests.',
                style: TextStyle(
                  color: GlimpseColors.coolGray,
                  fontSize: 14.sp(context),
                  height: 1.6,
                ),
              ),
              SizedBox(height: 40.h(context)),

              // Email Invite Field
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _emailController,
                        style: const TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: 'Enter photographer email',
                          hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)),
                          border: InputBorder.none,
                        ),
                        keyboardType: TextInputType.emailAddress,
                      ),
                    ),
                    _isInviting
                        ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                        : IconButton(
                            icon: const Icon(Icons.send, color: Colors.white),
                            onPressed: _handleInvite,
                          ),
                  ],
                ),
              ),

              SizedBox(height: 24.h(context)),
              _buildInviteOption(
                context,
                'Share Invite Link',
                'Photographers can join using a private URL.',
                Icons.link
              ),
              SizedBox(height: 16.h(context)),
              _buildInviteOption(
                context,
                'Show Invite QR',
                'Display a QR code for photographers to scan.',
                Icons.qr_code
              ),
              const Spacer(),
              GestureDetector(
                onTap: () => context.go('/photographer-dashboard'),
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(vertical: 16.h(context)),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    'Done',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16.sp(context),
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20.h(context)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTopBar(BuildContext context) {
    return GestureDetector(
      onTap: () => context.pop(),
      child: Container(
        width: 36.w(context), height: 36.w(context),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
        ),
        child: const Icon(Icons.close, color: Colors.white, size: 18),
      ),
    );
  }

  Widget _buildInviteOption(BuildContext context, String title, String subtitle, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
      ),
      child: Row(
        children: [
          Container(
            width: 44.w(context), height: 44.w(context),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: Colors.white, size: 20),
          ),
          SizedBox(width: 16.w(context)),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(color: Colors.white, fontSize: 16.sp(context), fontWeight: FontWeight.w600)),
                SizedBox(height: 4.h(context)),
                Text(subtitle, style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context))),
              ],
            ),
          ),
          Icon(Icons.chevron_right, color: Colors.white.withValues(alpha: 0.3), size: 18),
        ],
      ),
    );
  }
}
