import 'package:flutter/material.dart';

class ModerationScreen extends StatelessWidget {
  final String eventId;
  const ModerationScreen({super.key, required this.eventId});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Moderation")),
      body: const Center(child: Text("Moderation")),
    );
  }
}
