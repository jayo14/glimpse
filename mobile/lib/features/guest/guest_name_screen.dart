import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_input.dart';
import 'package:go_router/go_router.dart';
import 'dart:math' as math;

class GuestNameScreen extends StatefulWidget {
  const GuestNameScreen({super.key});

  @override
  State<GuestNameScreen> createState() => _GuestNameScreenState();
}

class _GuestNameScreenState extends State<GuestNameScreen> {
  final TextEditingController _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(color: Color(0xF50E0E10)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.only(left: 24.w(context), top: 52.h(context)),
                  child: GestureDetector(
                    onTap: () => context.pop(),
                    child: Container(
                      width: 36.h(context),
                      height: 36.h(context),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.05),
                        border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.chevron_left, color: Colors.white, size: 16),
                    ),
                  ),
                ),

                Padding(
                  padding: EdgeInsets.only(top: 16.h(context)),
                  child: Center(
                    child: const NameScatterCards(),
                  ),
                ),

                Expanded(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Who is joining the circle?',
                          style: TextStyle(
                            fontFamily: 'EB Garamond',
                            fontSize: 38.sp(context),
                            color: Colors.white,
                            letterSpacing: -0.02 * 38,
                            height: 1.12,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        SizedBox(height: 24.h(context)),
                        GlimpseInput(
                          controller: _nameController,
                          hint: 'Type your first and last name...',
                        ),
                        SizedBox(height: 14.h(context)),
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 14.w(context), vertical: 8.h(context)),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.03),
                            borderRadius: BorderRadius.circular(999),
                            border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.camera_alt, color: GlimpseColors.coolGray, size: 13.sp(context)),
                              SizedBox(width: 8.w(context)),
                              Text(
                                'The Host has allocated you 15 Candid Lens shots.',
                                style: TextStyle(
                                  color: GlimpseColors.coolGray,
                                  fontSize: 12.sp(context),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                Padding(
                  padding: EdgeInsets.fromLTRB(32.w(context), 0, 32.w(context), 48.h(context)),
                  child: GestureDetector(
                    onTap: () => context.go('/viewfinder'),
                    child: Container(
                      width: double.infinity,
                      padding: EdgeInsets.symmetric(vertical: 13.h(context)),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Get in',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 13.sp(context),
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          SizedBox(width: 8.w(context)),
                          const Icon(Icons.arrow_forward, color: Colors.black, size: 15),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class NameScatterCards extends StatelessWidget {
  const NameScatterCards({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 230.w(context),
      height: 209.h(context),
      child: Stack(
        children: [
          _NameCard(
            rotation: -4,
            offset: const Offset(0, 10),
            src: 'https://images.unsplash.com/photo-1645730826845-cd2ddec9984f?w=400',
            zIndex: 1,
          ),
          _NameCard(
            rotation: 3.5,
            offset: const Offset(100, -6),
            src: 'https://images.unsplash.com/photo-1592044799155-1d00a3c80792?w=400',
            zIndex: 2,
          ),
        ],
      ),
    );
  }
}

class _NameCard extends StatelessWidget {
  final double rotation;
  final Offset offset;
  final String src;
  final int zIndex;

  const _NameCard({required this.rotation, required this.offset, required this.src, required this.zIndex});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: offset.dx.w(context),
      top: offset.dy.h(context) + 12.h(context),
      child: Transform.rotate(
        angle: rotation * math.pi / 180,
        child: Container(
          width: 130.w(context),
          height: 185.h(context),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24.h(context)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
            boxShadow: [
              BoxShadow(color: Colors.black.withValues(alpha: 0.55), blurRadius: 28, offset: const Offset(0, 8)),
            ],
            image: DecorationImage(image: NetworkImage(src), fit: BoxFit.cover),
          ),
        ),
      ),
    );
  }
}
