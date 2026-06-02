import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../shared/widgets/photo_card.dart';

class InstantRevealScreen extends StatelessWidget {
  const InstantRevealScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        alignment: Alignment.center,
        children: [
          // Background Glow
          Container(
            decoration: const BoxDecoration(
              gradient: RadialGradient(
                center: Alignment(0, -0.3),
                radius: 0.8,
                colors: [Color(0x1AFFFFFF), Colors.transparent],
              ),
            ),
          ),

          Padding(
            padding: EdgeInsets.symmetric(horizontal: 32.w(context)),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Scatter of PhotoCards
                SizedBox(
                  height: 380.h(context),
                  child: Stack(
                    alignment: Alignment.center,
                    children: const [
                      PhotoCard(
                        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
                        alt: 'Wedding Guest',
                        rotation: -8,
                      ),
                      Positioned(
                        top: 20,
                        child: PhotoCard(
                          src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
                          alt: 'Couple',
                          rotation: 5,
                        ),
                      ),
                      Positioned(
                        top: 40,
                        child: PhotoCard(
                          src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
                          alt: 'Reception',
                          rotation: 2,
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 48.h(context)),

                Text(
                  'Your memories are ready.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'EB Garamond',
                    fontSize: 38.sp(context),
                    color: Colors.white,
                    letterSpacing: -0.02 * 38,
                    height: 1.1,
                  ),
                ),
                SizedBox(height: 12.h(context)),
                Text(
                  'We found 18 photos of you from the Sarah & David Wedding. Ready to dive in?',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: GlimpseColors.coolGray,
                    fontSize: 14.sp(context),
                    height: 1.6,
                  ),
                ),
                SizedBox(height: 40.h(context)),

                GestureDetector(
                  onTap: () => context.go('/guest-hub'),
                  child: Container(
                    width: double.infinity,
                    padding: EdgeInsets.symmetric(vertical: 16.h(context)),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '✨ View My Gallery',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 16.sp(context),
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.01 * 16,
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
