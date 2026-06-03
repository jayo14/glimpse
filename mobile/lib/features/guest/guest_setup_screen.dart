import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_input.dart';
import 'package:go_router/go_router.dart';
import 'dart:ui';
import 'dart:math' as math;

class GuestSetupScreen extends StatefulWidget {
  const GuestSetupScreen({super.key});

  @override
  State<GuestSetupScreen> createState() => _GuestSetupScreenState();
}

class _GuestSetupScreenState extends State<GuestSetupScreen> {
  final TextEditingController _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(color: const Color(0xEB121214), border: Border.all(color: Colors.white.withValues(alpha: 0.04))),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: EdgeInsets.only(left: 24.w(context), top: 52.h(context)),
                    child: GestureDetector(
                      onTap: () => context.pop(),
                      child: Container(width: 36.h(context), height: 36.h(context), decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: 0.09)), shape: BoxShape.circle), child: const Icon(Icons.chevron_left, color: Colors.white, size: 16)),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 16.h(context)),
                    child: Center(child: Column(children: [const SelfieScatterCards(), SizedBox(height: 20.h(context)), Container(padding: EdgeInsets.symmetric(horizontal: 20.w(context), vertical: 9.h(context)), decoration: BoxDecoration(borderRadius: BorderRadius.circular(999), border: Border.all(color: Colors.white.withValues(alpha: 0.22))), child: Row(mainAxisSize: MainAxisSize.min, children: [Text('📷', style: TextStyle(fontSize: 13.sp(context))), SizedBox(width: 6.w(context)), Text('Start Camera', style: TextStyle(color: Colors.white, fontSize: 13.sp(context), fontWeight: FontWeight.w500, letterSpacing: 0.02 * 13))]))])),
                  ),
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Let's find your Glimpse.", style: TextStyle(fontFamily: 'EB Garamond', fontSize: 40.sp(context), color: Colors.white, letterSpacing: -0.02 * 40, height: 1.12, fontWeight: FontWeight.w400)),
                          SizedBox(height: 28.h(context)),
                          GlimpseInput(controller: _nameController, hint: 'Enter your full name'),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.fromLTRB(32.w(context), 0, 32.w(context), 48.h(context)),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(children: List.generate(3, (i) => Container(margin: EdgeInsets.only(right: 8.w(context)), width: i == 0 ? 20.w(context) : 7.w(context), height: 7.h(context), decoration: BoxDecoration(color: i == 0 ? Colors.white : Colors.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(999))))),
                        GestureDetector(
                          onTap: () => context.go('/role-selection'),
                          child: Container(
                            padding: EdgeInsets.symmetric(horizontal: 36.w(context), vertical: 14.h(context)),
                            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(999)),
                            child: Row(children: [Text('Register Face', style: TextStyle(color: Colors.black, fontSize: 14.sp(context), fontWeight: FontWeight.w700, letterSpacing: 0.01 * 14)), SizedBox(width: 8.w(context)), const Icon(Icons.arrow_forward, color: Colors.black, size: 16)]),
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
}

class SelfieScatterCards extends StatelessWidget {
  const SelfieScatterCards({super.key});
  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(child: SizedBox(width: 278.w(context), height: 248.h(context), child: Stack(children: [_SelfieCard(rotation: -4.5, offset: const Offset(0, 10), src: 'https://images.unsplash.com/photo-1516117525866-d85459db7457?w=400', zIndex: 1), _SelfieCard(rotation: 3.5, offset: const Offset(123, -6), src: 'https://images.unsplash.com/photo-1631747059938-98105dad94c6?w=400', zIndex: 2)])));
  }
}

class _SelfieCard extends StatelessWidget {
  final double rotation;
  final Offset offset;
  final String src;
  final int zIndex;
  const _SelfieCard({required this.rotation, required this.offset, required this.src, required this.zIndex});
  @override
  Widget build(BuildContext context) {
    return Positioned(left: offset.dx.w(context), top: offset.dy.h(context) + 12.h(context), child: Transform.rotate(angle: rotation * math.pi / 180, child: Container(width: 155.w(context), height: 224.h(context), decoration: BoxDecoration(borderRadius: BorderRadius.circular(24.h(context)), border: Border.all(color: Colors.white.withValues(alpha: 0.1)), boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.6), blurRadius: 32, offset: const Offset(0, 8))]), clipBehavior: Clip.antiAlias, child: Stack(children: [Transform.scale(scale: 1.18, child: Image.network(src, width: double.infinity, height: double.infinity, fit: BoxFit.cover, color: Colors.black.withValues(alpha: 0.18), colorBlendMode: BlendMode.dstATop)), Positioned(bottom: 0, left: 0, right: 0, height: 60.h(context), child: Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.bottomCenter, end: Alignment.topCenter, colors: [Colors.black.withValues(alpha: 0.55), Colors.transparent]))))]))));
  }
}
