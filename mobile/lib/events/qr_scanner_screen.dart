import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import '../camera/camera_screen.dart';

class QrScannerScreen extends StatefulWidget {
  const QrScannerScreen({super.key});
  @override
  State<QrScannerScreen> createState() => _QrScannerScreenState();
}

class _QrScannerScreenState extends State<QrScannerScreen> {
  bool _isScanned = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Scan Event QR")),
      body: MobileScanner(
        onDetect: (capture) {
          if (_isScanned) return;
          final List<Barcode> barcodes = capture.barcodes;
          if (barcodes.isNotEmpty && barcodes.first.rawValue != null) {
            setState(() => _isScanned = true);
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => CameraScreen(eventId: barcodes.first.rawValue!)));
          }
        },
      ),
    );
  }
}
