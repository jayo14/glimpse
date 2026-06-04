import re

content = open('mobile/lib/features/guest/qr_scanner_screen.dart').read()

imports = """import 'package:mobile_scanner/mobile_scanner.dart';"""

if 'mobile_scanner.dart' not in content:
    content = imports + '\n' + content

# Replace entire build method's Stack children if needed, or just the camera part
# Let's target the Image.network first
scanner_widget = """Positioned.fill(child: MobileScanner(
            onDetect: (capture) {
              final List<Barcode> barcodes = capture.barcodes;
              if (barcodes.isNotEmpty) {
                final String? code = barcodes.first.rawValue;
                if (code != null) {
                   debugPrint('Barcode found! $code');
                   context.go('/guest-name');
                }
              }
            },
          )),"""

content = re.sub(r'Positioned\.fill\(child: Image\.network\(.*?\)\),', scanner_widget, content, flags=re.DOTALL)

with open('mobile/lib/features/guest/qr_scanner_screen.dart', 'w') as f:
    f.write(content)
