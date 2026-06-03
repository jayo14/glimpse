import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'dart:ui';

class PhotographerDashboard extends StatelessWidget {
  const PhotographerDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          // Background lens effect
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 400.w(context),
              height: 400.w(context),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [Colors.white.withValues(alpha: 0.05), Colors.transparent],
                ),
              ),
            ),
          ),

          SafeArea(
            child: Column(
              children: [
                _buildTopBar(context),
                Expanded(
                  child: SingleChildScrollView(
                    padding: EdgeInsets.symmetric(horizontal: 20.w(context)),
                    child: Column(
                      children: [
                        SizedBox(height: 24.h(context)),
                        _buildActiveEventCard(context),
                        SizedBox(height: 14.h(context)),
                        _buildUploadZone(context),
                        SizedBox(height: 14.h(context)),
                        _buildStatsGrid(context),
                        SizedBox(height: 18.h(context)),
                        _buildProcessedCarousel(context),
                        SizedBox(height: 36.h(context)),
                      ],
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

  Widget _buildTopBar(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w(context), vertical: 10.h(context)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildCircleButton(context, Icons.chevron_left, () => context.pop()),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 14.w(context), vertical: 5.h(context)),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.04),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
            ),
            child: Row(
              children: [
                Container(
                  width: 6, height: 6,
                  decoration: const BoxDecoration(color: Color(0xFF34C759), shape: BoxShape.circle),
                ),
                SizedBox(width: 7.w(context)),
                Text(
                  'LIVE SESSION',
                  style: TextStyle(
                    color: Colors.white.withValues(alpha: 0.6),
                    fontSize: 11.sp(context),
                    letterSpacing: 0.08 * 11,
                  ),
                ),
              ],
            ),
          ),
          _buildCircleButton(context, Icons.more_horiz, () {}),
        ],
      ),
    );
  }

  Widget _buildCircleButton(BuildContext context, IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36.w(context), height: 36.w(context),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
        ),
        child: Icon(icon, color: Colors.white, size: 16),
      ),
    );
  }

  Widget _buildActiveEventCard(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xB3141416), // rgba(20,20,22,0.7)
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('ACTIVE EVENT', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 10.sp(context), letterSpacing: 0.1 * 10)),
                    SizedBox(height: 8.h(context)),
                    Text(
                      'Sarah & David Wedding',
                      style: TextStyle(
                        fontFamily: 'EB Garamond',
                        fontSize: 26.sp(context),
                        color: Colors.white,
                        height: 1.1,
                      ),
                    ),
                    SizedBox(height: 12.h(context)),
                    Text(
                      'Host: Sarah Jenkins · Live · 12h left',
                      style: TextStyle(color: Colors.white.withValues(alpha: 0.4), fontSize: 11.sp(context)),
                    ),
                  ],
                ),
              ),
              // Thumbnail stack (simplified)
              Container(
                width: 52.w(context), height: 52.w(context),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  image: const DecorationImage(
                    image: NetworkImage('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=100'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUploadZone(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 28.h(context)),
      decoration: BoxDecoration(
        color: const Color(0x99101012),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withValues(alpha: 0.14), style: BorderStyle.solid), // Should be dashed
      ),
      child: Column(
        children: [
          Icon(Icons.upload_file, color: Colors.white.withValues(alpha: 0.4), size: 32.sp(context)),
          SizedBox(height: 10.h(context)),
          Text(
            'Drop professional files here\nor Browse files',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white.withValues(alpha: 0.45), fontSize: 13.sp(context), height: 1.6),
          ),
          SizedBox(height: 10.h(context)),
          Text(
            'RAW · JPG · PNG · TIFF supported',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.2), fontSize: 10.sp(context), letterSpacing: 0.04 * 10),
          ),
        ],
      ),
    );
  }

  Widget _buildStatsGrid(BuildContext context) {
    return Row(
      children: [
        _buildStatItem(context, '1,240', 'SAMPLES'),
        SizedBox(width: 8.w(context)),
        _buildStatItem(context, '94.2%', 'CONFIDENCE'),
        SizedBox(width: 8.w(context)),
        _buildStatItem(context, '18ms', 'LATENCY'),
      ],
    );
  }

  Widget _buildStatItem(BuildContext context, String value, String label) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 14.h(context)),
        decoration: BoxDecoration(
          color: const Color(0xCC101012),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
        ),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontFamily: 'EB Garamond', fontSize: 20.sp(context), color: Colors.white)),
            Text(label, style: TextStyle(color: GlimpseColors.coolGray, fontSize: 9.sp(context), letterSpacing: 0.08 * 9)),
          ],
        ),
      ),
    );
  }

  Widget _buildProcessedCarousel(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('PROCESSED', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context), letterSpacing: 0.1 * 11)),
            Text('42 / 248', style: TextStyle(color: Colors.white.withValues(alpha: 0.3), fontSize: 11.sp(context))),
          ],
        ),
        SizedBox(height: 10.h(context)),
        SizedBox(
          height: 90.h(context),
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: 10,
            separatorBuilder: (_, __) => SizedBox(width: 8.w(context)),
            itemBuilder: (context, index) => Container(
              width: 72.w(context),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                image: const DecorationImage(
                  image: NetworkImage('https://images.unsplash.com/photo-1519741497674-611481863552?w=200'),
                  fit: BoxFit.cover,
                ),
              ),
              alignment: Alignment.bottomRight,
              padding: const EdgeInsets.all(6),
              child: Container(
                width: 7, height: 7,
                decoration: const BoxDecoration(color: Color(0xFF34C759), shape: BoxShape.circle),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
