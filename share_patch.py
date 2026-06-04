import re

content = open('mobile/lib/features/shared/share_screen.dart').read()

imports = """import 'package:gal/gal.dart';
import 'package:share_plus/share_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'package:flutter/services.dart';"""

if 'gal.dart' not in content:
    content = imports + '\n' + content

# Add helper methods for sharing
share_helpers = """
  Future<void> _downloadAll() async {
    final hasAccess = await Gal.hasAccess();
    if (!hasAccess) {
      await Gal.requestAccess();
    }

    // In a real app, we would download the actual files.
    // Here we show the intent with a snackbar.
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Downloading 12 photos to gallery...'))
    );
  }

  Future<void> _shareGallery() async {
    await Share.share(
      'Check out my Glimpse gallery from Paris Tech Gala 2026! https://glimpse.app/g/paris-tech-2026',
      subject: 'My Glimpse Gallery',
    );
  }
"""

# Insert before build method
content = content.replace('  @override\n  Widget build(BuildContext context) {', share_helpers + '\n  @override\n  Widget build(BuildContext context) {')

# Wire up the Share Option (X/Twitter as example for native share)
content = content.replace("() => _handleOption(i)", "() { if (i == 0) _shareGallery(); else _handleOption(i); }")

# Wire up the Download Strip
content = content.replace('child: Row(', 'onTap: _downloadAll,\n        child: Row(')

with open('mobile/lib/features/shared/share_screen.dart', 'w') as f:
    f.write(content)
