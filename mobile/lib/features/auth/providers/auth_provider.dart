import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user_model.dart';
import '../repositories/auth_repository.dart';
import '../../user/repositories/user_repository.dart';
import '../../../core/storage/secure_storage.dart';

final authRepositoryProvider = Provider((ref) => AuthRepository());
final userRepositoryProvider = Provider((ref) => UserRepository());

final authProvider = AsyncNotifierProvider<AuthNotifier, UserModel?>(() {
  return AuthNotifier();
});

class AuthNotifier extends AsyncNotifier<UserModel?> {
  late final AuthRepository _authRepository;
  late final UserRepository _userRepository;

  @override
  Future<UserModel?> build() async {
    _authRepository = ref.watch(authRepositoryProvider);
    _userRepository = ref.watch(userRepositoryProvider);
    
    // Check tokens and fetch current user profile
    try {
      final token = await SecureStorage.getAccessToken();
      if (token != null) {
        final user = await _userRepository.getUserContext();
        return user;
      }
    } catch (e) {
      // Token might be invalid or expired
      await SecureStorage.clearTokens();
    }
    return null; // Start unauthenticated
  }

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final response = await _authRepository.login(email, password);
      if (response.accessToken != null) {
        await SecureStorage.saveTokens(accessToken: response.accessToken!);
      }
      return response.user;
    });
  }

  Future<bool> register(String email, String password) async {
    state = const AsyncValue.loading();
    try {
      final response = await _authRepository.register(email, password);
      state = AsyncValue.data(response.user);
      return response.emailConfirmationRequired;
    } catch (e, st) {
      state = AsyncValue.error(e, st);
      rethrow;
    }
  }

  Future<void> forgotPassword(String email) async {
    await _authRepository.forgotPassword(email);
  }

  Future<void> verifyEmail(String token) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final response = await _authRepository.verifyEmail(token);
      if (response.accessToken != null) {
        await SecureStorage.saveTokens(accessToken: response.accessToken!);
      }
      return response.user;
    });
  }

  Future<void> resendVerification(String email) async {
    await _authRepository.resendVerification(email);
  }

  Future<void> resetPassword(String token, String newPassword) async {
    await _authRepository.resetPassword(token, newPassword);
  }

  Future<void> updateProfile(Map<String, dynamic> data) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final user = await _userRepository.updateProfile(data);
      return user;
    });
  }

  Future<void> logout() async {
    await _authRepository.logout();
    await SecureStorage.clearTokens();
    state = const AsyncValue.data(null);
  }
}
