import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/access_response.dart';
import '../repositories/guest_repository.dart';

final guestRepositoryProvider = Provider((ref) => GuestRepository());

final guestProvider = AsyncNotifierProvider<GuestNotifier, AccessResponse?>(() {
  return GuestNotifier();
});

class GuestNotifier extends AsyncNotifier<AccessResponse?> {
  late final GuestRepository _guestRepository;

  @override
  Future<AccessResponse?> build() async {
    _guestRepository = ref.watch(guestRepositoryProvider);
    return null;
  }

  Future<void> verifyAccess({String? eventId, String? token}) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      return await _guestRepository.verifyAccess(eventId: eventId, token: token);
    });
  }
}
