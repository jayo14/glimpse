import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'dart:math' as math;
import 'package:gal/gal.dart';
import 'package:share_plus/share_plus.dart';

class ShareScreen extends StatefulWidget {
  const ShareScreen({super.key});

  @override
  State<ShareScreen> createState() => _ShareScreenState();
}

class _ShareScreenState extends State<ShareScreen> {
  int? _selectedIdx;
  bool _copied = false;

  final List<Map<String, dynamic>> _shareOptions = [
    {'label': 'X / Twitter', 'icon': Icons.close, 'color': const Color(0x0AFFFFFF), 'border': const Color(0x1EFFFFFF)},
    {'label': 'Instagram', 'icon': Icons.camera_alt, 'color': const Color(0x1FE1306C), 'border': const Color(0x48E1306C)},
    {'label': 'Save to Photos', 'icon': Icons.download, 'color': const Color(0x1A34C759), 'border': const Color(0x4034C759)},
    {'label': 'Copy Link', 'icon': Icons.link, 'color': const Color(0x0AFFFFFF), 'border': const Color(0x1EFFFFFF)},
    {'label': 'AirDrop', 'icon': Icons.wifi, 'color': const Color(0x1F0A84FF), 'border': const Color(0x480A84FF)},
  ];

  void _handleOption(int i) {
    setState(() => _selectedIdx = i);
    if (i == 3) {
      setState(() => _copied = true);
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) setState(() => _copied = false);
      });
    }
    Future.delayed(const Duration(milliseconds: 400), () {
      if (mounted) setState(() => _selectedIdx = null);
    });
  }

  Future<void> _downloadAll() async {
    final hasAccess = await Gal.hasAccess();
    if (!hasAccess) {
      await Gal.requestAccess();
    }

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Downloading 12 photos to gallery...'))
      );
    }
  }

  Future<void> _shareGallery() async {
    await Share.share(
      'Check out my Glimpse gallery from Paris Tech Gala 2026! https://glimpse.app/g/paris-tech-2026',
      subject: 'My Glimpse Gallery',
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Stack(
        children: [
          // Top glow
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: Container(
              height: 200.h(context),
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: const Alignment(0, -1),
                  radius: 0.7,
                  colors: [Colors.white.withValues(alpha: 0.04), Colors.transparent],
                ),
              ),
            ),
          ),

          Column(
            children: [
              _buildHeader(context),
              _buildPhotoFan(context),
              _buildHeadline(context),
              _buildOptionsGrid(context),
              const Divider(color: Colors.white10, height: 48),
              _buildDownloadStrip(context),
            ],
          ),

          if (_copied)
            _buildToast(context),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 52.h(context), left: 24.w(context), right: 24.w(context)),
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
          Text(
            'Share',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 13.sp(context), letterSpacing: 0.04 * 13),
          ),
          const SizedBox(width: 36),
        ],
      ),
    );
  }

  Widget _buildPhotoFan(BuildContext context) {
    final List<String> photos = [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200',
    ];
    return Container(
      margin: EdgeInsets.only(top: 32.h(context), bottom: 8.h(context)),
      height: 120.h(context),
      child: Stack(
        alignment: Alignment.center,
        children: [
          _buildFanCard(photos[0], -8, -18.w(context), 1),
          _buildFanCard(photos[2], 8, 18.w(context), 2),
          _buildFanCard(photos[1], 0, 0, 3),
        ],
      ),
    );
  }

  Widget _buildFanCard(String src, double rot, double dx, int z) {
    return Transform.translate(
      offset: Offset(dx, 0),
      child: Transform.rotate(
        angle: rot * math.pi / 180,
        child: Container(
          width: 90.w(context),
          height: 110.h(context),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: Colors.white.withValues(alpha: 0.15), width: 1.5),
            boxShadow: [
              BoxShadow(color: Colors.black.withValues(alpha: 0.4), blurRadius: z == 3 ? 24 : 12, offset: const Offset(0, 4)),
            ],
            image: DecorationImage(image: NetworkImage(src), fit: BoxFit.cover, colorFilter: ColorFilter.mode(Colors.black.withValues(alpha: 0.2), BlendMode.darken)),
          ),
        ),
      ),
    );
  }

  Widget _buildHeadline(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 32.w(context), vertical: 20.h(context)),
      child: Column(
        children: [
          Text(
            'Share your Glimpses',
            style: TextStyle(
              fontFamily: 'EB Garamond',
              fontSize: 30.sp(context),
              color: Colors.white,
              letterSpacing: -0.02 * 30,
              height: 1.1,
            ),
          ),
          SizedBox(height: 6.h(context)),
          Text(
            '12 matched photos · Paris Tech Gala 2026',
            style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context)),
          ),
        ],
      ),
    );
  }

  Widget _buildOptionsGrid(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w(context)),
      child: Wrap(
        spacing: 10,
        runSpacing: 10,
        children: List.generate(_shareOptions.length, (i) {
          final opt = _shareOptions[i];
          final isSel = _selectedIdx == i;
          return GestureDetector(
            onTap: () {
              if (i == 0) {
                _shareGallery();
              } else {
                _handleOption(i);
              }
            },
            child: AnimatedScale(
              scale: isSel ? 0.93 : 1.0,
              duration: const Duration(milliseconds: 100),
              child: Container(
                width: (MediaQuery.of(context).size.width - 60) / 3,
                padding: EdgeInsets.symmetric(vertical: 16.h(context)),
                decoration: BoxDecoration(
                  color: opt['color'],
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: opt['border']),
                ),
                child: Column(
                  children: [
                    Icon(opt['icon'], color: Colors.white.withValues(alpha: 0.7), size: 20.sp(context)),
                    SizedBox(height: 8.h(context)),
                    Text(
                      (i == 3 && _copied) ? 'Copied!' : opt['label'],
                      style: TextStyle(color: Colors.white.withValues(alpha: 0.6), fontSize: 10.sp(context)),
                    ),
                  ],
                ),
              ),
            ),
          );
        }),
      ),
    );
  }

  Widget _buildDownloadStrip(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w(context)),
      child: GestureDetector(
        onTap: _downloadAll,
        child: Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.04),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
          ),
          child: Row(
            children: [
              Container(
                width: 34.w(context), height: 34.w(context),
                decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.08), borderRadius: BorderRadius.circular(10)),
                child: const Icon(Icons.download, color: Colors.white, size: 16),
              ),
              SizedBox(width: 12.w(context)),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Download All (HD)', style: TextStyle(color: Colors.white, fontSize: 13.sp(context), fontWeight: FontWeight.w500)),
                    Text('12 photos · ~84 MB', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context))),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, color: Colors.white.withValues(alpha: 0.35), size: 14),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildToast(BuildContext context) {
    return Positioned(
      bottom: 52.h(context),
      left: 0, right: 0,
      child: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
          decoration: BoxDecoration(
            color: const Color(0x2634C759),
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: const Color(0x4D34C759)),
          ),
          child: const Text('Link copied to clipboard', style: TextStyle(color: Color(0xFF34C759), fontSize: 12)),
        ),
      ),
    );
  }
}
