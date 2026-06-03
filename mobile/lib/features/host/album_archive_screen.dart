import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';

class AlbumArchiveScreen extends StatelessWidget {
  const AlbumArchiveScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: SafeArea(
        child: Column(
          children: [
            _buildTopBar(context),
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: 20.w(context)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 24.h(context)),
                    Text(
                      'Past Events',
                      style: TextStyle(
                        fontFamily: 'EB Garamond',
                        fontSize: 34.sp(context),
                        color: Colors.white,
                        letterSpacing: -0.02 * 34,
                      ),
                    ),
                    SizedBox(height: 8.h(context)),
                    Text(
                      'Your collection of digital memory books.',
                      style: TextStyle(color: GlimpseColors.coolGray, fontSize: 14.sp(context)),
                    ),
                    SizedBox(height: 28.h(context)),
                    _buildAlbumItem(context, 'Paris Tech Gala', 'Jan 12, 2026 · 142 photos', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400'),
                    SizedBox(height: 16.h(context)),
                    _buildAlbumItem(context, 'Summer Solstice', 'Jun 21, 2025 · 89 photos', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'),
                    SizedBox(height: 16.h(context)),
                    _buildAlbumItem(context, 'Art Basel Dinner', 'Dec 04, 2024 · 210 photos', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTopBar(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w(context), vertical: 10.h(context)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: () => context.pop(),
            child: Container(
              width: 36.w(context), height: 36.w(context),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.05),
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
              ),
              child: const Icon(Icons.chevron_left, color: Colors.white, size: 18),
            ),
          ),
          const SizedBox(),
        ],
      ),
    );
  }

  Widget _buildAlbumItem(BuildContext context, String title, String subtitle, String imageUrl) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Image.network(imageUrl, fit: BoxFit.cover),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: TextStyle(color: Colors.white, fontSize: 18.sp(context), fontWeight: FontWeight.w600)),
                    SizedBox(height: 4.h(context)),
                    Text(subtitle, style: TextStyle(color: GlimpseColors.coolGray, fontSize: 13.sp(context))),
                  ],
                ),
                Icon(Icons.chevron_right, color: Colors.white.withValues(alpha: 0.3)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
