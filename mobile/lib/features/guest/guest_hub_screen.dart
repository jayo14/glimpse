import 'package:flutter/material.dart';
import '../../core/theme/colors.dart';
import '../../core/utils/responsive.dart';
import 'package:go_router/go_router.dart';

class GuestHubScreen extends StatefulWidget {
  const GuestHubScreen({super.key});

  @override
  State<GuestHubScreen> createState() => _GuestHubScreenState();
}

class _GuestHubScreenState extends State<GuestHubScreen> with TickerProviderStateMixin {
  int _activeEvent = 1;
  late AnimationController _gridFadeController;

  final List<Map<String, dynamic>> _events = [
    {'title': 'Wedding Party', 'subtitle': 'Brighton, June 2025'},
    {'title': 'Paris Tech Gala 2026', 'subtitle': 'Le Marais, May 2026'},
    {'title': 'Birthday Bash', 'subtitle': 'NYC, Apr 2026'},
  ];

  final List<Map<String, dynamic>> _photos = [
    {'src': 'https://images.unsplash.com/photo-1758922584983-82ffd5720c6a?w=300', 'label': 'Studio', 'tall': true},
    {'src': 'https://images.unsplash.com/photo-1742890184672-3ac8f37095cb?w=300', 'label': 'Candid by Yen', 'tall': false},
    {'src': 'https://images.unsplash.com/photo-1774897795463-e6e4618a4997?w=300', 'label': 'Studio', 'tall': false},
    {'src': 'https://images.unsplash.com/photo-1628551018559-5ba1456aa6a3?w=300', 'label': 'Candid by Mila', 'tall': true},
    {'src': 'https://images.unsplash.com/photo-1779400202416-c070f6fd47b5?w=300', 'label': 'Studio', 'tall': false},
    {'src': 'https://images.unsplash.com/photo-1528508670332-4c687dae6295?w=300', 'label': 'Candid by Tom', 'tall': false},
  ];

  @override
  void initState() {
    super.initState();
    _gridFadeController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    )..forward();
  }

  @override
  void dispose() {
    _gridFadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlimpseColors.deepCharcoal,
      body: Column(
        children: [
          SizedBox(height: 56.h(context)),
          SizedBox(
            height: 220.h(context),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 28.w(context)),
              itemCount: _events.length,
              itemBuilder: (context, index) {
                bool isActive = index == _activeEvent;
                return GestureDetector(
                  onTap: () => setState(() => _activeEvent = index),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 350),
                    curve: Curves.easeInOut,
                    margin: EdgeInsets.only(right: 12.w(context)),
                    width: isActive ? 314.w(context) : 80.w(context),
                    decoration: BoxDecoration(
                      color: isActive ? const Color(0xFA1A1A1C) : const Color(0x99141416),
                      borderRadius: BorderRadius.circular(22.h(context)),
                      border: Border.all(color: Colors.white.withValues(alpha: isActive ? 0.13 : 0.05)),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: isActive ? _buildActiveEventCard(index) : _buildCollapsedEventCard(index),
                  ),
                );
              },
            ),
          ),

          Padding(
            padding: EdgeInsets.fromLTRB(24.w(context), 12.h(context), 24.w(context), 0),
            child: GestureDetector(
              onTap: () => context.go('/guest-hub'),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 14.h(context)),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(999)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.search, color: Colors.black, size: 15),
                    SizedBox(width: 8.w(context)),
                    Text('Find my Photos', style: TextStyle(color: Colors.black, fontSize: 14.sp(context), fontWeight: FontWeight.w700)),
                  ],
                ),
              ),
            ),
          ),

          Padding(
            padding: EdgeInsets.fromLTRB(28.w(context), 20.h(context), 28.w(context), 12.h(context)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('YOUR PHOTOS', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context), letterSpacing: 0.12 * 11, fontWeight: FontWeight.w500)),
                Text('See all →', style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context))),
              ],
            ),
          ),

          Expanded(
            child: GridView.builder(
              padding: EdgeInsets.symmetric(horizontal: 16.w(context)),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
                childAspectRatio: 0.75,
              ),
              itemCount: _photos.length,
              itemBuilder: (context, index) {
                final photo = _photos[index];
                return _buildAnimatedPhotoTile(photo, index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAnimatedPhotoTile(Map<String, dynamic> photo, int index) {
    final animation = CurvedAnimation(
      parent: _gridFadeController,
      curve: Interval(
        (index * 0.1).clamp(0, 1),
        (index * 0.1 + 0.4).clamp(0, 1),
        curve: Curves.easeOut,
      ),
    );

    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        return Opacity(
          opacity: animation.value,
          child: Transform.scale(
            scale: 0.95 + (0.05 * animation.value),
            child: child,
          ),
        );
      },
      child: _buildPhotoTile(photo),
    );
  }

  Widget _buildPhotoTile(Map<String, dynamic> photo) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16.h(context)),
        image: DecorationImage(image: NetworkImage(photo['src']), fit: BoxFit.cover),
      ),
      child: Stack(
        children: [
          Positioned(
            top: 8.h(context), left: 8.w(context),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 9.w(context), vertical: 3.h(context)),
              decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.9), borderRadius: BorderRadius.circular(999)),
              child: Text(photo['label'], style: TextStyle(color: Colors.black, fontSize: 10.sp(context), fontWeight: FontWeight.w600)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActiveEventCard(int index) {
    final ev = _events[index];
    return Padding(
      padding: EdgeInsets.all(16.h(context)),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        _SmallGlassButton(icon: Icons.chevron_left, onTap: () => context.pop()),
                        SizedBox(width: 8.w(context)),
                        _SmallGlassButton(icon: Icons.home_outlined),
                        SizedBox(width: 8.w(context)),
                        _SmallGlassButton(icon: Icons.settings_outlined),
                      ],
                    ),
                    SizedBox(height: 10.h(context)),
                    Text(ev['title'], style: TextStyle(fontFamily: 'EB Garamond', fontSize: 22.sp(context), color: Colors.white, height: 1.1)),
                    Text(ev['subtitle'], style: TextStyle(color: GlimpseColors.coolGray, fontSize: 11.sp(context))),
                  ],
                ),
              ),
              Container(
                width: 64.h(context), height: 64.h(context),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14.h(context)),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                  image: const DecorationImage(image: NetworkImage('https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=300'), fit: BoxFit.cover),
                ),
              ),
            ],
          ),
          Column(
            children: [
              _buildMetaRow(Icons.star_border, '12 Studio Matches'),
              _buildMetaRow(Icons.camera_alt_outlined, '4 Candids Snapped'),
              _buildMetaRow(Icons.photo_library_outlined, '492 Event Photos'),
            ],
          ),
          Row(
            children: [
              Expanded(child: _ActionPill(label: 'Get HD', isPrimary: false)),
              SizedBox(width: 8.w(context)),
              Expanded(child: _ActionPill(label: 'Invite', isPrimary: false)),
              SizedBox(width: 8.w(context)),
              Expanded(child: _ActionPill(label: 'Lens', isPrimary: true, icon: Icons.camera, onTap: () => context.push('/viewfinder'))),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCollapsedEventCard(int index) {
    final ev = _events[index];
    return Center(
      child: RotatedBox(
        quarterTurns: 1,
        child: Text(
          ev['title'].toUpperCase(),
          style: TextStyle(
            fontFamily: 'EB Garamond',
            fontSize: 13.sp(context),
            color: Colors.white.withValues(alpha: 0.35),
            letterSpacing: 0.04 * 13,
          ),
        ),
      ),
    );
  }

  Widget _buildMetaRow(IconData icon, String text) {
    return Padding(
      padding: EdgeInsets.only(bottom: 5.h(context)),
      child: Row(
        children: [
          Icon(icon, color: GlimpseColors.coolGray, size: 12.sp(context)),
          SizedBox(width: 7.w(context)),
          Text(text, style: TextStyle(color: GlimpseColors.coolGray, fontSize: 12.sp(context))),
        ],
      ),
    );
  }
}

class _SmallGlassButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onTap;
  const _SmallGlassButton({required this.icon, this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 30.h(context), height: 30.h(context),
        decoration: BoxDecoration(
          color: const Color(0xB81E1E20),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, color: Colors.white, size: 14),
      ),
    );
  }
}

class _ActionPill extends StatelessWidget {
  final String label;
  final bool isPrimary;
  final IconData? icon;
  final VoidCallback? onTap;
  const _ActionPill({required this.label, required this.isPrimary, this.icon, this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 9.h(context)),
        decoration: BoxDecoration(
          color: isPrimary ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(999),
          border: isPrimary ? null : Border.all(color: Colors.white.withValues(alpha: 0.18)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[Icon(icon, color: Colors.black, size: 14), SizedBox(width: 5.w(context))],
            Text(label, style: TextStyle(color: isPrimary ? Colors.black : Colors.white, fontSize: 12.sp(context), fontWeight: isPrimary ? FontWeight.w600 : FontWeight.w500)),
          ],
        ),
      ),
    );
  }
}
