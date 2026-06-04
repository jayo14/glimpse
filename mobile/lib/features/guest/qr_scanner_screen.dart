import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:flutter/material.dart';
import '../../core/utils/responsive.dart';
import 'package:go_router/go_router.dart';
import 'dart:ui';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> with SingleTickerProviderStateMixin {
  late AnimationController _scanController;
  bool _flashActive = false;

  @override
  void initState() {
    super.initState();
    _scanController = AnimationController(duration: const Duration(milliseconds: 1800), vsync: this)..repeat();
  }

  @override
  void dispose() {
    _scanController.dispose();
    super.dispose();
  }

  void _handleShutter() {
    setState(() => _flashActive = true);
    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) {
        setState(() => _flashActive = false);
        context.go('/guest-name');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          Positioned.fill(child: MobileScanner(
            onDetect: (capture) {
              final List<Barcode> barcodes = capture.barcodes;
              if (barcodes.isNotEmpty) {
                final String? code = barcodes.first.rawValue;
                if (code != null) {
                   debugPrint('Barcode found! $code');
                   context.go('/guest-name');
                }
              }
            },
          )),
          Positioned.fill(child: Container(decoration: BoxDecoration(gradient: RadialGradient(center: Alignment.center, radius: 1.0, colors: [Colors.transparent, Colors.black.withValues(alpha: 0.7)], stops: const [0.4, 1.0])))),
          Positioned(
            top: 0, left: 0, right: 0,
            child: Padding(
              padding: EdgeInsets.fromLTRB(20.w(context), 56.h(context), 20.w(context), 16.h(context)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(onTap: () => context.pop(), child: ClipOval(child: BackdropFilter(filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12), child: Container(width: 40.h(context), height: 40.h(context), decoration: BoxDecoration(color: const Color(0x8C141416), border: Border.all(color: Colors.white.withValues(alpha: 0.14)), shape: BoxShape.circle), child: const Icon(Icons.close, color: Colors.white, size: 16))))),
                  ClipRRect(borderRadius: BorderRadius.circular(999), child: BackdropFilter(filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12), child: Container(padding: EdgeInsets.symmetric(horizontal: 16.w(context), vertical: 7.h(context)), decoration: BoxDecoration(color: const Color(0x8C141416), border: Border.all(color: Colors.white.withValues(alpha: 0.12))), child: Text('SCAN QR CODE', style: TextStyle(color: Colors.white.withValues(alpha: 0.75), fontSize: 12.sp(context), fontWeight: FontWeight.w500, letterSpacing: 0.06 * 12))))),
                  SizedBox(width: 40.h(context)),
                ],
              ),
            ),
          ),
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  width: 220.w(context), height: 220.w(context),
                  child: Stack(
                    children: [
                      CustomPaint(painter: ScannerBracketPainter(), size: Size.infinite),
                      AnimatedBuilder(
                        animation: _scanController,
                        builder: (context, child) {
                          return Positioned(top: 12 + (220 - 26) * _scanController.value, left: 8, right: 8, child: Container(height: 2, decoration: BoxDecoration(gradient: LinearGradient(colors: [Colors.transparent, Colors.white.withValues(alpha: 0.9), Colors.white.withValues(alpha: 0.5), Colors.transparent]), boxShadow: [BoxShadow(color: Colors.white.withValues(alpha: 0.35), blurRadius: 12, spreadRadius: 3)])));
                        },
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 20.h(context)),
                Text('Point at the host\'s event QR code', style: TextStyle(color: Colors.white.withValues(alpha: 0.45), fontSize: 13.sp(context), letterSpacing: 0.02 * 13)),
                SizedBox(height: 80.h(context)),
              ],
            ),
          ),
          Positioned(bottom: 52.h(context), left: 0, right: 0, child: Center(child: GestureDetector(onTap: _handleShutter, child: Container(width: 82.h(context), height: 82.h(context), decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle, border: Border.all(color: Colors.black.withValues(alpha: 0.35), width: 3), boxShadow: [BoxShadow(color: Colors.white.withValues(alpha: 0.55), spreadRadius: 4)]))))),
          if (_flashActive) Positioned.fill(child: Container(color: Colors.white.withValues(alpha: 0.28))),
        ],
      ),
    );
  }
}

class ScannerBracketPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.white..strokeWidth = 3..style = PaintingStyle.stroke..strokeCap = StrokeCap.round;
    const corner = 22.0;
    canvas.drawPath(Path()..moveTo(0, corner)..lineTo(0, 0)..lineTo(corner, 0), paint);
    canvas.drawPath(Path()..moveTo(size.width - corner, 0)..lineTo(size.width, 0)..lineTo(size.width, corner), paint);
    canvas.drawPath(Path()..moveTo(0, size.height - corner)..lineTo(0, size.height)..lineTo(corner, size.height), paint);
    canvas.drawPath(Path()..moveTo(size.width - corner, size.height)..lineTo(size.width, size.height)..lineTo(size.width, size.height - corner), paint);
  }
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
