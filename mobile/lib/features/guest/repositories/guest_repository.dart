import 'package:dio/dio.dart';
import '../../../core/network/api_client.dart';
import '../models/access_response.dart';

class GuestRepository {
  final Dio _dio = ApiClient.instance;

  Future<AccessResponse> verifyAccess({String? eventId, String? token}) async {
    try {
      final response = await _dio.post('/event/verify-access', data: {
        if (eventId != null) 'event_id': eventId,
        if (token != null) 'token': token,
      });
      return AccessResponse.fromJson(response.data);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Access denied');
      }
      throw Exception('Network error or server unavailable');
    }
  }
}
