import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:io' show Platform;

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});
  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  @override
  Widget build(BuildContext context) {
    bool isIOS = false;
    try { isIOS = Platform.isIOS; } catch (_) {}

    Widget content = Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text("Join Glimpse", style: Theme.of(context).textTheme.displayMedium?.copyWith(color: Colors.white), textAlign: TextAlign.center),
          const SizedBox(height: 48),
          if (isIOS) ...[
            const CupertinoTextField(placeholder: "Full Name", padding: EdgeInsets.all(12), style: TextStyle(color: Colors.white)),
            const SizedBox(height: 16),
            const CupertinoTextField(placeholder: "Email", padding: EdgeInsets.all(12), style: TextStyle(color: Colors.white)),
            const SizedBox(height: 16),
            const CupertinoTextField(placeholder: "Password", obscureText: true, padding: EdgeInsets.all(12), style: TextStyle(color: Colors.white)),
          ] else ...[
            const TextField(decoration: InputDecoration(labelText: "Full Name", border: OutlineInputBorder())),
            const SizedBox(height: 16),
            const TextField(decoration: InputDecoration(labelText: "Email", border: OutlineInputBorder())),
            const SizedBox(height: 16),
            const TextField(decoration: InputDecoration(labelText: "Password", border: OutlineInputBorder(),), obscureText: true),
          ],
          const SizedBox(height: 32),
          if (isIOS)
            CupertinoButton.filled(onPressed: () {}, child: const Text("CREATE ACCOUNT"))
          else
            ElevatedButton(onPressed: () {}, child: const Text("CREATE ACCOUNT")),
        ],
      ),
    );

    if (isIOS) {
      return CupertinoPageScaffold(navigationBar: const CupertinoNavigationBar(middle: Text("Sign Up")), child: content);
    } else {
      return Scaffold(appBar: AppBar(title: const Text("Sign Up")), body: content);
    }
  }
}
