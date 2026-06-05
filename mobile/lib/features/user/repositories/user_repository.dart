import 'package:dio/dio.dart';
import '../../../core/network/api_client.dart';
import '../../auth/models/user_model.dart';

class UserRepository {
  final Dio _dio = ApiClient.instance;

  Future<UserModel> getUserContext() async {
    try {
      final response = await _dio.get('/user/me');
      return UserModel.fromJson(response.data['user']);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Failed to get user context');
      }
      throw Exception('Network error or server unavailable');
    }
  }

  Future<UserModel> updateProfile(Map<String, dynamic> data) async {
    try {
      final response = await _dio.post('/user/profile-update', data: data);
      return UserModel.fromJson(response.data['user']);
    } on DioException catch (e) {
      if (e.response != null && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Failed to update profile');
      }
      throw Exception('Network error or server unavailable');
    }
  }
}
