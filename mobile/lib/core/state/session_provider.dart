import 'package:flutter_riverpod/flutter_riverpod.dart';

class SessionState {
  final String? role;
  final String? eventName;
  final bool hasSelfie;
  final String? userName;

  SessionState({this.role, this.eventName, this.hasSelfie = false, this.userName});

  SessionState copyWith({String? role, String? eventName, bool? hasSelfie, String? userName}) {
    return SessionState(
      role: role ?? this.role,
      eventName: eventName ?? this.eventName,
      hasSelfie: hasSelfie ?? this.hasSelfie,
      userName: userName ?? this.userName,
    );
  }
}

class SessionNotifier extends StateNotifier<SessionState> {
  SessionNotifier() : super(SessionState());

  void setRole(String role) => state = state.copyWith(role: role);
  void setEventName(String name) => state = state.copyWith(eventName: name);
  void setSelfieCaptured(bool captured) => state = state.copyWith(hasSelfie: captured);
  void setUserName(String name) => state = state.copyWith(userName: name);
}

final sessionProvider = StateNotifierProvider<SessionNotifier, SessionState>((ref) {
  return SessionNotifier();
});
