import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:io' show Platform;
import 'signup_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

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
          Text("Welcome Back", style: Theme.of(context).textTheme.displayMedium?.copyWith(color: Colors.white), textAlign: TextAlign.center),
          const SizedBox(height: 48),
          if (isIOS) ...[
            CupertinoTextField(
              controller: _emailController,
              placeholder: "Email",
              padding: const EdgeInsets.all(12),
              style: const TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 16),
            CupertinoTextField(
              controller: _passwordController,
              placeholder: "Password",
              obscureText: true,
              padding: const EdgeInsets.all(12),
              style: const TextStyle(color: Colors.white),
            ),
          ] else ...[
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: "Email", border: OutlineInputBorder()),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: "Password", border: OutlineInputBorder()),
              obscureText: true,
            ),
          ],
          const SizedBox(height: 32),
          if (isIOS)
            CupertinoButton.filled(
              onPressed: () {},
              child: const Text("LOGIN"),
            )
          else
            ElevatedButton(
              onPressed: () {},
              child: const Text("LOGIN"),
            ),
          const SizedBox(height: 16),
          TextButton(
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (context) => SignUpScreen())),
            child: const Text("Don't have an account? Sign Up"),
          ),
        ],
      ),
    );

    if (isIOS) {
      return CupertinoPageScaffold(
        navigationBar: const CupertinoNavigationBar(middle: Text("Host Login")),
        child: content,
      );
    } else {
      return Scaffold(
        appBar: AppBar(title: const Text("Host Login")),
        body: content,
      );
    }
  }
}
