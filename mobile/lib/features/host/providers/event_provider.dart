import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/event_model.dart';
import '../repositories/event_repository.dart';

final eventRepositoryProvider = Provider((ref) => EventRepository());

final eventProvider = AsyncNotifierProvider<EventNotifier, EventModel?>(() {
  return EventNotifier();
});

class EventNotifier extends AsyncNotifier<EventModel?> {
  late final EventRepository _eventRepository;

  @override
  Future<EventModel?> build() async {
    _eventRepository = ref.watch(eventRepositoryProvider);
    return null;
  }

  Future<void> createEvent(Map<String, dynamic> data) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      return await _eventRepository.createEvent(data);
    });
  }

  Future<void> addCollaborator(String eventId, String email) async {
    await _eventRepository.addCollaborator(eventId, email);
  }
}
