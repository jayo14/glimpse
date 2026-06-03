import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../../core/widgets/glimpse_button.dart';
import 'package:go_router/go_router.dart';

class GuestEntryScreen extends StatefulWidget {
  const GuestEntryScreen({super.key});

  @override
  State<GuestEntryScreen> createState() => _GuestEntryScreenState();
}

class _GuestEntryScreenState extends State<GuestEntryScreen> {
  final TextEditingController _codeController = TextEditingController();

  void _handleInput(String val) {
    setState(() {
      final filtered = val.replaceAll(RegExp(r'\D'), '');
      if (filtered.length > 6) {
        _codeController.text = filtered.substring(0, 6);
      } else {
        _codeController.text = filtered;
      }
      _codeController.selection = TextSelection.fromPosition(
          TextPosition(offset: _codeController.text.length));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.only(left: 24.w(context), top: 56.h(context)),
            child: GestureDetector(
              onTap: () => context.pop(),
              child: Container(
                width: 36.h(context),
                height: 36.h(context),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.06),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.chevron_left, color: Colors.white, size: 17),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.fromLTRB(28.w(context), 0, 28.w(context), 60.h(context)),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const TicketGraphic(),
                  SizedBox(height: 32.h(context)),
                  Text(
                    'Enter the Glimpse Portal.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: 'EB Garamond',
                      fontSize: 38.sp(context),
                      color: Colors.white,
                      letterSpacing: -0.02 * 38,
                      height: 1.1,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  SizedBox(height: 10.h(context)),
                  Text(
                    "Got an invite? Drop your event code below or scan the host's QR to jump straight in.",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: GlimpseColors.coolGray,
                      fontSize: 13.sp(context),
                      height: 1.6,
                    ),
                  ),
                  SizedBox(height: 36.h(context)),
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.symmetric(horizontal: 20.w(context), vertical: 16.h(context)),
                    decoration: BoxDecoration(
                      color: const Color(0xF20E0E10),
                      borderRadius: BorderRadius.circular(16.h(context)),
                      border: Border.all(color: Colors.white.withValues(alpha: 0.09)),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _codeController,
                            keyboardType: TextInputType.number,
                            onChanged: _handleInput,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18.sp(context),
                              letterSpacing: 0.22 * 18,
                            ),
                            decoration: InputDecoration(
                              hintText: 'Enter 6-Digit Event Code...',
                              hintStyle: TextStyle(
                                color: GlimpseColors.coolGray,
                                fontSize: 18.sp(context),
                                letterSpacing: 0,
                              ),
                              border: InputBorder.none,
                              isDense: true,
                            ),
                          ),
                        ),
                        if (_codeController.text.length == 6)
                          GestureDetector(
                            onTap: () => context.go('/guest-name'),
                            child: Container(
                              width: 34.h(context),
                              height: 34.h(context),
                              decoration: const BoxDecoration(
                                color: Colors.white,
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.arrow_forward, color: Colors.black, size: 14),
                            ),
                          ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: 22.h(context)),
                    child: Row(
                      children: [
                        Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.08))),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 14.w(context)),
                          child: Text(
                            'or',
                            style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context)),
                          ),
                        ),
                        Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.08))),
                      ],
                    ),
                  ),
                  GlimpseButton(
                    label: 'Scan Event QR Code',
                    onPressed: () => context.push('/qr-scanner'),
                    isPrimary: true,
                    icon: Text('📷', style: TextStyle(fontSize: 16.sp(context))),
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

class TicketGraphic extends StatelessWidget {
  const TicketGraphic({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(160.w(context), 72.h(context)),
      painter: TicketPainter(context),
    );
  }
}

class TicketPainter extends CustomPainter {
  final BuildContext context;
  TicketPainter(this.context);

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;
    final perf = 5.0 * (w / 160.0);
    final bgPaint = Paint()..color = const Color(0xFF0E0E10)..style = PaintingStyle.fill;
    final borderPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.18)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1;

    final path = Path()
      ..moveTo(1, 10)
      ..lineTo(1, h / 2 - perf)
      ..arcToPoint(Offset(1, h / 2 + perf), radius: Radius.circular(perf), clockwise: true)
      ..lineTo(1, h - 10)
      ..arcToPoint(Offset(10, h - 1), radius: Radius.circular(10), clockwise: false)
      ..lineTo(w - 10, h - 1)
      ..arcToPoint(Offset(w - 1, h - 10), radius: Radius.circular(10), clockwise: false)
      ..lineTo(w - 1, h / 2 + perf)
      ..arcToPoint(Offset(w - 1, h / 2 - perf), radius: Radius.circular(perf), clockwise: true)
      ..lineTo(w - 1, 10)
      ..arcToPoint(Offset(w - 10, 1), radius: Radius.circular(10), clockwise: false)
      ..lineTo(10, 1)
      ..arcToPoint(Offset(1, 10), radius: Radius.circular(10), clockwise: false);

    canvas.drawPath(path, bgPaint);
    canvas.drawPath(path, borderPaint);

    // Dashed line
    final dashPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.1)
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;
    final x = w * 0.72;
    double startY = 8;
    while (startY < h - 8) {
      canvas.drawLine(Offset(x, startY), Offset(x, startY + 3), dashPaint);
      startY += 6;
    }

    // Perforations
    final perfCirclePaint = Paint()
      ..color = const Color(0xFF0E0E10)
      ..style = PaintingStyle.fill;
    final perfBorderPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.14)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 0.5;

    for (int i = 0; i < 7; i++) {
      double px = 28.0 * (w / 160.0) + i * 16.0 * (w / 160.0);
      canvas.drawCircle(Offset(px, 1), 2.5, perfCirclePaint);
      canvas.drawCircle(Offset(px, 1), 2.5, perfBorderPaint);
      canvas.drawCircle(Offset(px, h - 1), 2.5, perfCirclePaint);
      canvas.drawCircle(Offset(px, h - 1), 2.5, perfBorderPaint);
    }

    // Text (Simplified as CustomPainter doesn't handle rich text easily, but we can use TextPainter if needed)
    final textPainterGlimpse = TextPainter(
      text: TextSpan(
        text: 'Glimpse',
        style: TextStyle(
          fontFamily: 'Georgia',
          fontSize: 11.sp(context),
          color: Colors.white.withValues(alpha: 0.35),
          letterSpacing: 1,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainterGlimpse.paint(canvas, Offset(22.w(context), h / 2 - 12.h(context)));

    final textPainterPass = TextPainter(
      text: TextSpan(
        text: 'EVENT PASS',
        style: TextStyle(
          fontFamily: 'monospace',
          fontSize: 8.sp(context),
          color: Colors.white.withValues(alpha: 0.18),
          letterSpacing: 2,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainterPass.paint(canvas, Offset(22.w(context), h / 2 + 2.h(context)));
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
