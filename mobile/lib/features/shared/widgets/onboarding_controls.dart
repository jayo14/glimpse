import 'package:flutter/material.dart';
import '../../../core/utils/responsive.dart';

class StepIndicator extends StatelessWidget {
  final int totalSteps;
  final int currentStep;

  const StepIndicator({
    super.key,
    required this.totalSteps,
    required this.currentStep,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(totalSteps, (index) {
        return AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          margin: EdgeInsets.symmetric(horizontal: 4.w(context)),
          width: 8.w(context),
          height: 8.w(context),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: index == currentStep
                ? Colors.white
                : Colors.white.withValues(alpha: 0.25),
          ),
        );
      }),
    );
  }
}

class AddCoverButton extends StatelessWidget {
  final VoidCallback? onClick;

  const AddCoverButton({super.key, this.onClick});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.w(context), vertical: 8.h(context)),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.add, color: Colors.white, size: 16.sp(context)),
            SizedBox(width: 6.w(context)),
            Text(
              'Add Cover',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14.sp(context),
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class NextButton extends StatelessWidget {
  final VoidCallback? onClick;

  const NextButton({super.key, this.onClick});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 32.w(context), vertical: 14.h(context)),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(999),
        ),
        child: Text(
          'Next →',
          style: TextStyle(
            color: Colors.black,
            fontSize: 15.sp(context),
            fontWeight: FontWeight.w600,
            letterSpacing: -0.01 * 15,
          ),
        ),
      ),
    );
  }
}
