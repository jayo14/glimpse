import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import '../shared/widgets/onboarding_controls.dart';
import 'providers/event_provider.dart';

class EventCreationScreen extends ConsumerStatefulWidget {
  const EventCreationScreen({super.key});

  @override
  ConsumerState<EventCreationScreen> createState() => _EventCreationScreenState();
}

class _EventCreationScreenState extends ConsumerState<EventCreationScreen> {
  int _currentStep = 0;
  final int _totalSteps = 3;

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;

  @override
  void dispose() {
    _nameController.dispose();
    _locationController.dispose();
    super.dispose();
  }

  Future<void> _handleCreateEvent() async {
    if (_nameController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter an event name')),
      );
      return;
    }

    final eventStart = _selectedDate != null && _selectedTime != null
        ? DateTime(
            _selectedDate!.year,
            _selectedDate!.month,
            _selectedDate!.day,
            _selectedTime!.hour,
            _selectedTime!.minute,
          )
        : null;

    final eventData = {
      'title': _nameController.text,
      'location': _locationController.text,
      'event_start': eventStart?.toIso8601String(),
    };

    try {
      await ref.read(eventProvider.notifier).createEvent(eventData);
      if (mounted) {
        context.push('/event-launch');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final eventState = ref.watch(eventProvider);

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
                  eventState.isLoading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : NextButton(
                          onClick: () {
                            if (_currentStep < _totalSteps - 1) {
                              setState(() => _currentStep++);
                            } else {
                              _handleCreateEvent();
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
        _buildInputField('Event Name', 'e.g. Sarah & David Wedding', controller: _nameController),
        SizedBox(height: 16.h(context)),
        _buildInputField('Location', 'e.g. Paris, France', controller: _locationController),
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
        _buildInputField(
          'Date',
          _selectedDate == null ? 'Select Date' : '${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}',
          icon: Icons.calendar_today,
          onTap: () async {
            final date = await showDatePicker(
              context: context,
              initialDate: DateTime.now(),
              firstDate: DateTime.now(),
              lastDate: DateTime.now().add(const Duration(days: 365 * 2)),
            );
            if (date != null) setState(() => _selectedDate = date);
          },
        ),
        SizedBox(height: 16.h(context)),
        _buildInputField(
          'Time',
          _selectedTime == null ? 'Select Time' : _selectedTime!.format(context),
          icon: Icons.access_time,
          onTap: () async {
            final time = await showTimePicker(
              context: context,
              initialTime: TimeOfDay.now(),
            );
            if (time != null) setState(() => _selectedTime = time);
          },
        ),
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

  Widget _buildInputField(String label, String hint, {IconData? icon, TextEditingController? controller, VoidCallback? onTap}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context), letterSpacing: 1),
        ),
        SizedBox(height: 8.h(context)),
        GestureDetector(
          onTap: onTap,
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 16.w(context), vertical: 14.h(context)),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(12.h(context)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: controller != null
                      ? TextField(
                          controller: controller,
                          style: TextStyle(color: Colors.white, fontSize: 15.sp(context)),
                          decoration: InputDecoration(
                            hintText: hint,
                            hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3), fontSize: 15.sp(context)),
                            border: InputBorder.none,
                            isDense: true,
                            contentPadding: EdgeInsets.zero,
                          ),
                        )
                      : Text(
                          hint,
                          style: TextStyle(
                            color: _selectedDate != null || _selectedTime != null ? Colors.white : Colors.white.withValues(alpha: 0.3),
                            fontSize: 15.sp(context),
                          ),
                        ),
                ),
                if (icon != null) Icon(icon, color: Colors.white.withValues(alpha: 0.3), size: 18.sp(context)),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
