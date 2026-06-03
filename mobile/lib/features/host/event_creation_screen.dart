import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../shared/widgets/onboarding_controls.dart';

class EventCreationScreen extends StatefulWidget {
  const EventCreationScreen({super.key});

  @override
  State<EventCreationScreen> createState() => _EventCreationScreenState();
}

class _EventCreationScreenState extends State<EventCreationScreen> {
  int _currentStep = 0;
  final int _totalSteps = 3;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.w(context)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 20.h(context)),
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () => context.pop(),
                    child: Icon(Icons.close, color: Colors.white, size: 24.sp(context)),
                  ),
                  StepIndicator(totalSteps: _totalSteps, currentStep: _currentStep),
                  SizedBox(width: 24.w(context)),
                ],
              ),
              SizedBox(height: 48.h(context)),

              if (_currentStep == 0) _buildStep1(),
              if (_currentStep == 1) _buildStep2(),
              if (_currentStep == 2) _buildStep3(),

              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  if (_currentStep > 0)
                    GestureDetector(
                      onTap: () => setState(() => _currentStep--),
                      child: Text(
                        'Back',
                        style: TextStyle(color: GlimpseColors.coolGray, fontSize: 15.sp(context)),
                      ),
                    )
                  else
                    const SizedBox(),
                  NextButton(
                    onClick: () {
                      if (_currentStep < _totalSteps - 1) {
                        setState(() => _currentStep++);
                      } else {
                        context.push('/event-launch');
                      }
                    },
                  ),
                ],
              ),
              SizedBox(height: 20.h(context)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStep1() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'What are we\ncelebrating?',
          style: TextStyle(
            fontFamily: 'EB Garamond',
            fontSize: 40.sp(context),
            color: Colors.white,
            height: 1.1,
          ),
        ),
        SizedBox(height: 32.h(context)),
        _buildInputField('Event Name', 'e.g. Sarah & David Wedding'),
        SizedBox(height: 16.h(context)),
        _buildInputField('Location', 'e.g. Paris, France'),
      ],
    );
  }

  Widget _buildStep2() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'When is the\nbig day?',
          style: TextStyle(
            fontFamily: 'EB Garamond',
            fontSize: 40.sp(context),
            color: Colors.white,
            height: 1.1,
          ),
        ),
        SizedBox(height: 32.h(context)),
        _buildInputField('Date', 'Select Date', icon: Icons.calendar_today),
        SizedBox(height: 16.h(context)),
        _buildInputField('Time', 'Select Time', icon: Icons.access_time),
      ],
    );
  }

  Widget _buildStep3() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Add a cover\nphoto.',
          style: TextStyle(
            fontFamily: 'EB Garamond',
            fontSize: 40.sp(context),
            color: Colors.white,
            height: 1.1,
          ),
        ),
        SizedBox(height: 32.h(context)),
        Container(
          width: double.infinity,
          height: 200.h(context),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(24.h(context)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.1), style: BorderStyle.solid),
          ),
          child: Center(
            child: AddCoverButton(onClick: () {}),
          ),
        ),
      ],
    );
  }

  Widget _buildInputField(String label, String hint, {IconData? icon}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context), letterSpacing: 1),
        ),
        SizedBox(height: 8.h(context)),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 16.w(context), vertical: 14.h(context)),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(12.h(context)),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(hint, style: TextStyle(color: Colors.white.withValues(alpha: 0.3), fontSize: 15.sp(context))),
              ),
              if (icon != null) Icon(icon, color: Colors.white.withValues(alpha: 0.3), size: 18.sp(context)),
            ],
          ),
        ),
      ],
    );
  }
}
