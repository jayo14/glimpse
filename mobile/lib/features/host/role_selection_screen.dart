import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/state/session_provider.dart';
import 'package:go_router/go_router.dart';
import 'dart:ui';

class RoleSelectionScreen extends ConsumerStatefulWidget {
  const RoleSelectionScreen({super.key});

  @override
  ConsumerState<RoleSelectionScreen> createState() => _RoleSelectionScreenState();
}

class _RoleSelectionScreenState extends ConsumerState<RoleSelectionScreen> {
  String? _selectedRole;

  final List<Map<String, dynamic>> _roles = [
    {
      'id': 'host',
      'label': 'Event Host',
      'description': 'Create and manage events, invite guests, and oversee the complete photo experience from start to finish.',
      'icon': Icons.person_outline,
      'tag': 'Organiser',
    },
    {
      'id': 'photographer',
      'label': 'Photographer',
      'description': 'Deliver professional matched galleries, sync studio shots, and collaborate with hosts on live events.',
      'icon': Icons.camera_alt_outlined,
      'tag': 'Creator',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              color: const Color(0xEB121214),
              border: Border.all(color: Colors.white.withValues(alpha: 0.04)),
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
              child: Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(left: 28.w(context), top: 56.h(context)),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: GestureDetector(
                        onTap: () => context.pop(),
                        child: Container(
                          width: 36.h(context), height: 36.h(context),
                          decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.06), border: Border.all(color: Colors.white.withValues(alpha: 0.09)), shape: BoxShape.circle),
                          child: const Icon(Icons.chevron_left, color: Colors.white, size: 17),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 28.w(context)),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 14.w(context), vertical: 5.h(context)),
                            decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.04), border: Border.all(color: Colors.white.withValues(alpha: 0.1)), borderRadius: BorderRadius.circular(999)),
                            child: Text('STEP 2 OF 3', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context), letterSpacing: 0.1 * 11)),
                          ),
                          SizedBox(height: 20.h(context)),
                          Text('What\'s your role?', style: TextStyle(fontFamily: 'EB Garamond', fontSize: 38.sp(context), color: Colors.white, height: 1.1)),
                          SizedBox(height: 10.h(context)),
                          Text('Choose how you\'ll be using Glimpse. You can always change this later.', textAlign: TextAlign.center, style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context), height: 1.55)),
                          SizedBox(height: 36.h(context)),
                          ..._roles.map((role) => _buildRoleCard(role)),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(bottom: 48.h(context)),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(3, (i) => Container(
                            margin: EdgeInsets.only(right: 8.w(context)),
                            width: i == 1 ? 20.w(context) : 7.w(context),
                            height: 7.h(context),
                            decoration: BoxDecoration(color: i == 1 ? Colors.white : Colors.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(999)),
                          )),
                        ),
                        SizedBox(height: 16.h(context)),
                        GestureDetector(
                          onTap: _selectedRole != null ? () {
                            ref.read(sessionProvider.notifier).setRole(_selectedRole!);
                            context.go(_selectedRole == 'host' ? '/host-welcome' : '/photographer-welcome');
                          } : null,
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 36.w(context), vertical: 14.h(context)),
                            decoration: BoxDecoration(color: _selectedRole != null ? Colors.white : Colors.white.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(999)),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text('Continue', style: TextStyle(color: _selectedRole != null ? Colors.black : Colors.white.withValues(alpha: 0.3), fontSize: 14.sp(context), fontWeight: FontWeight.w700)),
                                SizedBox(width: 8.w(context)),
                                Icon(Icons.arrow_forward, color: _selectedRole != null ? Colors.black : Colors.white.withValues(alpha: 0.3), size: 16),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRoleCard(Map<String, dynamic> role) {
    bool isSelected = _selectedRole == role['id'];
    return GestureDetector(
      onTap: () => setState(() => _selectedRole = role['id']),
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h(context)),
        padding: EdgeInsets.all(20.h(context)),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white.withValues(alpha: 0.06) : Colors.white.withValues(alpha: 0.02),
          borderRadius: BorderRadius.circular(20.h(context)),
          border: Border.all(color: Colors.white.withValues(alpha: isSelected ? 0.35 : 0.08)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 48.h(context), height: 48.h(context),
              decoration: BoxDecoration(color: isSelected ? Colors.white.withValues(alpha: 0.12) : Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: isSelected ? 0.2 : 0.07)), borderRadius: BorderRadius.circular(14.h(context))),
              child: Icon(role['icon'], color: isSelected ? Colors.white : GlimpseColors.coolGray, size: 24),
            ),
            SizedBox(width: 16.w(context)),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(role['label'], style: TextStyle(color: Colors.white, fontSize: 16.sp(context), fontWeight: FontWeight.w600)),
                      SizedBox(width: 8.w(context)),
                      Container(
                        padding: EdgeInsets.symmetric(horizontal: 8.w(context), vertical: 2.h(context)),
                        decoration: BoxDecoration(color: isSelected ? Colors.white : Colors.white.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(999)),
                        child: Text(role['tag'], style: TextStyle(color: isSelected ? Colors.black : GlimpseColors.coolGray, fontSize: 10.sp(context), fontWeight: FontWeight.w600, letterSpacing: 0.08 * 10)),
                      ),
                    ],
                  ),
                  SizedBox(height: 6.h(context)),
                  Text(role['description'], style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context), height: 1.55)),
                ],
              ),
            ),
            Container(
              width: 20.h(context), height: 20.h(context),
              decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: isSelected ? Colors.white : Colors.white.withValues(alpha: 0.2), width: 1.5), color: isSelected ? Colors.white : Colors.transparent),
              child: isSelected ? const Icon(Icons.check, color: Colors.black, size: 12) : null,
            ),
          ],
        ),
      ),
    );
  }
}
