import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'dart:ui';

class EventGatewaySheet extends StatelessWidget {
  const EventGatewaySheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          // Blurred background
          Positioned.fill(
            child: GestureDetector(
              onTap: () => context.pop(),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
                child: Container(color: Colors.black.withValues(alpha: 0.55)),
              ),
            ),
          ),

          // Bottom Sheet
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFF0E0E10),
                borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
                border: Border.all(color: Colors.white.withValues(alpha: 0.07)),
              ),
              padding: EdgeInsets.only(bottom: 40.h(context)),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Drag Handle
                  Container(
                    width: 36.w(context),
                    height: 4.h(context),
                    margin: EdgeInsets.only(top: 14.h(context), bottom: 28.h(context)),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.18),
                      borderRadius: BorderRadius.circular(999),
                    ),
                  ),

                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 28.w(context)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Instant Memory Sync',
                          style: TextStyle(
                            fontFamily: 'EB Garamond',
                            fontSize: 34.sp(context),
                            color: Colors.white,
                            letterSpacing: -0.02 * 34,
                            height: 1.1,
                          ),
                        ),
                        SizedBox(height: 12.h(context)),
                        Text(
                          'Scan the QR to instantly unlock your personal Glimpse gallery and snap candid memories on our social lens.',
                          style: TextStyle(
                            color: GlimpseColors.coolGray,
                            fontSize: 13.sp(context),
                            height: 1.6,
                          ),
                        ),

                        // Dashed Divider
                        Padding(
                          padding: EdgeInsets.symmetric(vertical: 20.h(context)),
                          child: CustomPaint(
                            size: Size(double.infinity, 1),
                            painter: DashedLinePainter(),
                          ),
                        ),

                        // QR Portal Card
                        Center(
                          child: Container(
                            width: 230.w(context),
                            height: 230.w(context),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(28.h(context)),
                            ),
                            padding: const EdgeInsets.all(20),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                // Simple QR Placeholder
                                Expanded(
                                  child: Container(
                                    color: Colors.black, // Placeholder for real QR
                                    child: Center(
                                      child: Icon(Icons.qr_code_2, color: Colors.white, size: 100.w(context)),
                                    ),
                                  ),
                                ),
                                SizedBox(height: 10.h(context)),
                                Text(
                                  'GLIMPSE-PARIS-2026',
                                  style: TextStyle(
                                    color: GlimpseColors.coolGray,
                                    fontSize: 9.sp(context),
                                    letterSpacing: 0.12 * 9,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(height: 24.h(context)),

                        // Action Row
                        Row(
                          children: [
                            _buildActionButton(context, 'Share Guest Link', Icons.link),
                            SizedBox(width: 10.w(context)),
                            _buildActionButton(context, 'Save Portal Sign', Icons.download),
                          ],
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

  Widget _buildActionButton(BuildContext context, String label, IconData icon) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 14.h(context)),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: Colors.white.withValues(alpha: 0.18)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: Colors.white, size: 15.sp(context)),
            SizedBox(width: 7.w(context)),
            Text(
              label,
              style: TextStyle(
                color: Colors.white,
                fontSize: 12.sp(context),
                fontWeight: FontWeight.w500,
                letterSpacing: 0.01 * 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class DashedLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withValues(alpha: 0.15)
      ..strokeWidth = 1;
    const dashWidth = 6.0;
    const dashSpace = 6.0;
    double startX = 0;
    while (startX < size.width) {
      canvas.drawLine(Offset(startX, 0), Offset(startX + dashWidth, 0), paint);
      startX += dashWidth + dashSpace;
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
