import re

content = open('mobile/lib/features/guest/viewfinder_screen.dart').read()

imports = """import 'package:camera/camera.dart';
import 'package:permission_handler/permission_handler.dart';"""

if 'camera.dart' not in content:
    content = imports + '\n' + content

class_body = """
  CameraController? _controller;
  bool _isInitialized = false;
  int _shotCount = 12;
  bool _shutterFlash = false;

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  Future<void> _initializeCamera() async {
    final status = await Permission.camera.request();
    if (status.isGranted) {
      final cameras = await availableCameras();
      if (cameras.isEmpty) return;

      _controller = CameraController(
        cameras[0],
        ResolutionPreset.high,
        enableAudio: false,
      );

      try {
        await _controller!.initialize();
        if (mounted) {
          setState(() => _isInitialized = true);
        }
      } catch (e) {
        debugPrint('Camera error: $e');
      }
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }
"""

# Replace existing properties and initState
content = re.sub(r'  int _shotCount = 12;.*?bool _shutterFlash = false;', class_body, content, flags=re.DOTALL)

# Replace the camera feed widget
camera_widget = """
          Positioned.fill(
            child: _isInitialized && _controller != null
                ? CameraPreview(_controller!)
                : Container(
                    color: Colors.black,
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.camera_alt_outlined, color: Colors.white.withValues(alpha: 0.2), size: 48),
                          SizedBox(height: 16),
                          Text(
                            _isInitialized ? 'Initializing camera...' : 'Awaiting camera permission...',
                            style: TextStyle(color: Colors.white.withValues(alpha: 0.4), fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  ),
          ),
"""

content = re.sub(r'Positioned\.fill\(\s+child: Image\.network\(.*?\),\s+\),', camera_widget, content, flags=re.DOTALL)

with open('mobile/lib/features/guest/viewfinder_screen.dart', 'w') as f:
    f.write(content)
