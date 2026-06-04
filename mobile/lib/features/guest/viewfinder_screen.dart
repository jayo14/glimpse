import 'package:camera/camera.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter/material.dart';
import '../../core/utils/responsive.dart';
import 'package:go_router/go_router.dart';
import 'dart:ui';
import 'dart:math' as math;

class ViewfinderScreen extends StatefulWidget {
  const ViewfinderScreen({super.key});

  @override
  State<ViewfinderScreen> createState() => _ViewfinderScreenState();
}

class _ViewfinderScreenState extends State<ViewfinderScreen> {

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


  void _handleShutter() {
    setState(() {
      _shutterFlash = true;
      if (_shotCount > 0) _shotCount--;
    });
    Future.delayed(const Duration(milliseconds: 120), () {
      if (mounted) setState(() => _shutterFlash = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Full-bleed camera feed simulation

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


          // Film grain & Vignette
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  center: Alignment.center,
                  radius: 1.0,
                  colors: [Colors.transparent, Colors.black.withValues(alpha: 0.55)],
                  stops: const [0.55, 1.0],
                ),
              ),
            ),
          ),

          // Top HUD
          Positioned(
            top: 0, left: 0, right: 0,
            child: Padding(
              padding: EdgeInsets.fromLTRB(20.w(context), 56.h(context), 20.w(context), 16.h(context)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _GlassCircleButton(icon: Icons.close, onTap: () => context.pop()),
                  _GlassBadge(
                    child: Row(
                      children: [
                        Icon(Icons.access_time, color: Colors.white.withValues(alpha: 0.5), size: 13.sp(context)),
                        SizedBox(width: 6.w(context)),
                        Text(
                          '$_shotCount / 15 remaining',
                          style: TextStyle(
                            color: Colors.white.withValues(alpha: 0.7),
                            fontSize: 12.sp(context),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const _GlassCircleButton(icon: Icons.grid_view_rounded),
                ],
              ),
            ),
          ),

          // Bottom Controls
          Positioned(
            bottom: 52.h(context),
            left: 0, right: 0,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.w(context)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Film counter wheel
                  Container(
                    width: 52.w(context),
                    height: 100.h(context),
                    decoration: BoxDecoration(
                      color: const Color(0x8C141416),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: Colors.white.withValues(alpha: 0.12)),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('${_shotCount + 1}', style: TextStyle(color: Colors.white.withValues(alpha: 0.28), fontSize: 13.sp(context))),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 8.h(context)),
                              child: Text('$_shotCount', style: TextStyle(color: Colors.white, fontSize: 20.sp(context), fontWeight: FontWeight.w700)),
                            ),
                            Text('${_shotCount - 1}', style: TextStyle(color: Colors.white.withValues(alpha: 0.28), fontSize: 13.sp(context))),
                          ],
                        ),
                        // Gradients
                        Positioned(top: 0, left: 0, right: 0, height: 28.h(context), child: Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [const Color(0xE6141416), Colors.transparent])))),
                        Positioned(bottom: 0, left: 0, right: 0, height: 28.h(context), child: Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.bottomCenter, end: Alignment.topCenter, colors: [const Color(0xE6141416), Colors.transparent])))),
                      ],
                    ),
                  ),

                  // Shutter
                  GestureDetector(
                    onTap: _handleShutter,
                    child: Container(
                      width: 82.h(context),
                      height: 82.h(context),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.black.withValues(alpha: 0.35), width: 3),
                        boxShadow: [
                          BoxShadow(color: Colors.white.withValues(alpha: 0.55), spreadRadius: 4),
                        ],
                      ),
                    ),
                  ),

                  // Gallery Fan
                  const GalleryFan(),
                ],
              ),
            ),
          ),

          if (_shutterFlash)
            Positioned.fill(child: Container(color: Colors.white.withValues(alpha: 0.35))),
        ],
      ),
    );
  }
}

class _GlassCircleButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onTap;
  const _GlassCircleButton({required this.icon, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: ClipOval(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: Container(
            width: 40.h(context), height: 40.h(context),
            decoration: BoxDecoration(
              color: const Color(0x8C141416),
              border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: Colors.white, size: 16),
          ),
        ),
      ),
    );
  }
}

class _GlassBadge extends StatelessWidget {
  final Widget child;
  const _GlassBadge({required this.child});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(999),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 14.w(context), vertical: 7.h(context)),
          decoration: BoxDecoration(
            color: const Color(0x8C141416),
            border: Border.all(color: Colors.white.withValues(alpha: 0.12)),
          ),
          child: child,
        ),
      ),
    );
  }
}

class GalleryFan extends StatelessWidget {
  const GalleryFan({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 60.w(context), height: 72.h(context),
      child: Stack(
        alignment: Alignment.bottomRight,
        children: [
          _FanThumb(rotation: -1.5, offset: -4, src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200'),
          _FanThumb(rotation: 1.0, offset: -2, src: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=200'),
          _FanThumb(rotation: -0.5, offset: 0, src: 'https://images.unsplash.com/photo-1516117525866-d85459db7457?w=200'),
        ],
      ),
    );
  }
}

class _FanThumb extends StatelessWidget {
  final double rotation;
  final double offset;
  final String src;
  const _FanThumb({required this.rotation, required this.offset, required this.src});

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: Offset(0, offset.h(context)),
      child: Transform.rotate(
        angle: rotation * math.pi / 180,
        child: Container(
          width: 52.w(context), height: 66.h(context),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10.h(context)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.18), width: 1.5),
            boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.5), blurRadius: 10, offset: const Offset(0, 2))],
            image: DecorationImage(image: NetworkImage(src), fit: BoxFit.cover),
          ),
        ),
      ),
    );
  }
}
