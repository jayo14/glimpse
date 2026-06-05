import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/shared/splash_screen.dart';
import '../../features/shared/share_screen.dart';
import '../../features/auth/auth_screen.dart';
import '../../features/auth/signup_screen.dart';
import '../../features/auth/forgot_password_screen.dart';
import '../../features/auth/verify_email_screen.dart';
import '../../features/auth/reset_password_screen.dart';
import '../../features/guest/guest_setup_screen.dart';
import '../../features/guest/guest_entry_screen.dart';
import '../../features/guest/qr_scanner_screen.dart';
import '../../features/guest/guest_name_screen.dart';
import '../../features/guest/viewfinder_screen.dart';
import '../../features/guest/guest_hub_screen.dart';
import '../../features/guest/event_landing_screen.dart';
import '../../features/guest/face_scan_screen.dart';
import '../../features/guest/face_verification_screen.dart';
import '../../features/guest/matching_animation_screen.dart';
import '../../features/guest/instant_reveal_screen.dart';
import '../../features/guest/event_gateway_sheet.dart';
import '../../features/host/role_selection_screen.dart';
import '../../features/host/host_welcome_screen.dart';
import '../../features/host/photographer_welcome_screen.dart';
import '../../features/host/event_creation_screen.dart';
import '../../features/host/event_launch_screen.dart';
import '../../features/host/photographer_dashboard.dart';
import '../../features/host/invite_photographers_screen.dart';
import '../../features/host/album_archive_screen.dart';

final router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(path: '/', builder: (context, state) => const SplashScreen()),
    GoRoute(path: '/auth', builder: (context, state) => const AuthScreen()),
    GoRoute(path: '/signup', builder: (context, state) => const SignupScreen()),
    GoRoute(path: '/forgot-password', builder: (context, state) => const ForgotPasswordScreen()),
    GoRoute(
      path: '/verify-email', 
      builder: (context, state) => VerifyEmailScreen(token: state.uri.queryParameters['token'] ?? ''),
    ),
    GoRoute(
      path: '/reset-password', 
      builder: (context, state) => ResetPasswordScreen(token: state.uri.queryParameters['token'] ?? ''),
    ),
    GoRoute(path: '/role-selection', builder: (context, state) => const RoleSelectionScreen()),
    GoRoute(path: '/guest-entry', builder: (context, state) => const GuestEntryScreen()),
    GoRoute(path: '/qr-scanner', builder: (context, state) => const QRScannerScreen()),
    GoRoute(path: '/guest-setup', builder: (context, state) => const GuestSetupScreen()),
    GoRoute(path: '/guest-name', builder: (context, state) => const GuestNameScreen()),
    GoRoute(path: '/viewfinder', builder: (context, state) => const ViewfinderScreen()),
    GoRoute(path: '/guest-hub', builder: (context, state) => const GuestHubScreen()),

    // New Guest Flow Routes
    GoRoute(path: '/event-landing', builder: (context, state) => const EventLandingScreen()),
    GoRoute(path: '/face-scan', builder: (context, state) => const FaceScanScreen()),
    GoRoute(path: '/face-verification', builder: (context, state) => const FaceVerificationScreen()),
    GoRoute(path: '/matching-animation', builder: (context, state) => const MatchingAnimationScreen()),
    GoRoute(path: '/instant-reveal', builder: (context, state) => const InstantRevealScreen()),
    GoRoute(path: '/event-gateway', pageBuilder: (context, state) => CustomTransitionPage(
      key: state.pageKey,
      opaque: false,
      barrierColor: Colors.transparent,
      child: const EventGatewaySheet(),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(opacity: animation, child: child);
      },
    )),

    // New Host/Photographer Routes
    GoRoute(path: '/host-welcome', builder: (context, state) => const HostWelcomeScreen()),
    GoRoute(path: '/photographer-welcome', builder: (context, state) => const PhotographerWelcomeScreen()),
    GoRoute(path: '/event-creation', builder: (context, state) => const EventCreationScreen()),
    GoRoute(path: '/event-launch', builder: (context, state) => const EventLaunchScreen()),
    GoRoute(path: '/photographer-dashboard', builder: (context, state) => const PhotographerDashboard()),
    GoRoute(path: '/invite-photographers', builder: (context, state) => const InvitePhotographersScreen()),
    GoRoute(path: '/album-archive', builder: (context, state) => const AlbumArchiveScreen()),

    // Shared Routes
    GoRoute(path: '/share', builder: (context, state) => const ShareScreen()),
  ],
);
