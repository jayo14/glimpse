import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user_model.dart';
import '../repositories/auth_repository.dart';
import '../../../core/storage/secure_storage.dart';

final authRepositoryProvider = Provider((ref) => AuthRepository());

final authProvider = AsyncNotifierProvider<AuthNotifier, UserModel?>(() {
  return AuthNotifier();
});

class AuthNotifier extends AsyncNotifier<UserModel?> {
  late final AuthRepository _repository;

  @override
  Future<UserModel?> build() async {
    _repository = ref.watch(authRepositoryProvider);
    return null; // Start unauthenticated
  }

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final response = await _repository.login(email, password);
      if (response.accessToken != null) {
        await SecureStorage.saveTokens(accessToken: response.accessToken!);
      }
      return response.user;
    });
  }

  Future<bool> register(String email, String password) async {
    state = const AsyncValue.loading();
    try {
      final response = await _repository.register(email, password);
      state = AsyncValue.data(response.user);
      return response.emailConfirmationRequired;
    } catch (e, st) {
      state = AsyncValue.error(e, st);
      rethrow;
    }
  }

  Future<void> forgotPassword(String email) async {
    await _repository.forgotPassword(email);
  }

  Future<void> logout() async {
    await _repository.logout();
    await SecureStorage.clearTokens();
    state = const AsyncValue.data(null);
  }
}
