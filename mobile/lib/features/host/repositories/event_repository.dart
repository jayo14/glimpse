import 'package:dio/dio.dart';
import '../../../core/network/api_client.dart';
import '../models/event_model.dart';
import '../models/upload_response.dart';

class EventRepository {
  final Dio _dio = ApiClient.instance;

  Future<EventModel> createEvent(Map<String, dynamic> data) async {
    try {
      final response = await _dio.post('/event/create', data: data);
      return EventModel.fromJson(response.data['event']);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Failed to create event');
      }
      throw Exception('Network error or server unavailable');
    }
  }

  Future<UploadResponse> requestUpload(String eventId, String filename, String roleType) async {
    try {
      final response = await _dio.post(
        '/event/$eventId/media-upload',
        queryParameters: {'filename': filename},
      );
      return UploadResponse.fromJson(response.data);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Failed to request upload signature');
      }
      throw Exception('Network error or server unavailable');
    }
  }

  Future<void> addCollaborator(String eventId, String email) async {
    try {
      await _dio.post('/event/$eventId/collaborators', data: {'email': email});
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Failed to add collaborator');
      }
      throw Exception('Network error or server unavailable');
    }
  }
}
