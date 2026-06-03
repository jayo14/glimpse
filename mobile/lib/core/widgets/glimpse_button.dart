import 'package:flutter/material.dart';
import '../utils/responsive.dart';
import '../theme/colors.dart';

class GlimpseButton extends StatefulWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isPrimary;
  final bool isDisabled;
  final Widget? icon;

  const GlimpseButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.isPrimary = true,
    this.isDisabled = false,
    this.icon,
  });

  @override
  State<GlimpseButton> createState() => _GlimpseButtonState();
}

class _GlimpseButtonState extends State<GlimpseButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _isPressed = true),
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      onTap: widget.isDisabled ? null : widget.onPressed,
      child: AnimatedOpacity(
        duration: const Duration(milliseconds: 100),
        opacity: widget.isDisabled ? 0.5 : (_isPressed ? 0.8 : 1.0),
        child: AnimatedScale(
          duration: const Duration(milliseconds: 100),
          scale: _isPressed ? 0.98 : 1.0,
          child: Container(
            width: double.infinity,
            height: 52.h(context),
            decoration: BoxDecoration(
              color: widget.isPrimary ? GlimpseColors.pureWhite : Colors.transparent,
              borderRadius: BorderRadius.circular(26.h(context)),
              border: widget.isPrimary ? null : Border.all(color: Colors.white.withValues(alpha: 0.2)),
            ),
            alignment: Alignment.center,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (widget.icon != null) ...[
                  widget.icon!,
                  SizedBox(width: 10.w(context)),
                ],
                Text(
                  widget.label,
                  style: TextStyle(
                    color: widget.isPrimary ? Colors.black : Colors.white,
                    fontSize: 15.sp(context),
                    fontWeight: widget.isPrimary ? FontWeight.w600 : FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
