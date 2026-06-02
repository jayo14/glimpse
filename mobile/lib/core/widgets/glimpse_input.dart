import 'package:flutter/material.dart';
import '../utils/responsive.dart';
import '../theme/colors.dart';

class GlimpseInput extends StatelessWidget {
  final String hint;
  final bool isPassword;
  final TextEditingController? controller;
  final TextInputType keyboardType;
  final Widget? suffix;

  const GlimpseInput({
    super.key,
    required this.hint,
    this.isPassword = false,
    this.controller,
    this.keyboardType = TextInputType.text,
    this.suffix,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 52.h(context),
      decoration: BoxDecoration(
        color: const Color(0xF20E0E10), // rgba(14,14,16,0.95)
        borderRadius: BorderRadius.circular(16.h(context)),
        border: Border.all(color: const Color(0xFF2C2C2E)),
      ),
      padding: EdgeInsets.symmetric(horizontal: 18.w(context)),
      alignment: Alignment.center,
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: controller,
              obscureText: isPassword,
              keyboardType: keyboardType,
              style: TextStyle(
                color: Colors.white,
                fontSize: 15.sp(context),
              ),
              decoration: InputDecoration(
                hintText: hint,
                hintStyle: TextStyle(
                  color: GlimpseColors.coolGray,
                  fontSize: 15.sp(context),
                ),
                border: InputBorder.none,
                isDense: true,
              ),
            ),
          ),
          if (suffix != null) suffix!,
        ],
      ),
    );
  }
}
