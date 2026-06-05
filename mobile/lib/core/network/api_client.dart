import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../storage/secure_storage.dart';

class ApiClient {
  static final Dio _dio = Dio(BaseOptions(
    baseUrl: dotenv.env['API_URL'] ?? 'http://10.0.2.2:5002/api/v1',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ));

  static void initialize() {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final accessToken = await SecureStorage.getAccessToken();
        if (accessToken != null) {
          options.headers['Authorization'] = 'Bearer $accessToken';
        }
        return handler.next(options);
      },
      onError: (DioException e, handler) async {
        if (e.response?.statusCode == 401 && !e.requestOptions.path.contains('/auth/login') && !e.requestOptions.path.contains('/auth/refresh')) {
          try {
            final refreshToken = await SecureStorage.getRefreshToken();
            if (refreshToken == null) {
              await SecureStorage.clearTokens();
              return handler.next(e);
            }

            // Attempt to refresh the token
            final refreshResponse = await _dio.post('/auth/refresh', data: {
              'refresh_token': refreshToken,
            });

            if (refreshResponse.statusCode == 200) {
              final newAccessToken = refreshResponse.data['access_token'];
              await SecureStorage.saveTokens(accessToken: newAccessToken);

              // Retry the original request
              final opts = Options(
                method: e.requestOptions.method,
                headers: e.requestOptions.headers,
              );
              opts.headers?['Authorization'] = 'Bearer $newAccessToken';
              
              final cloneReq = await _dio.request(
                e.requestOptions.path,
                options: opts,
                data: e.requestOptions.data,
                queryParameters: e.requestOptions.queryParameters,
              );
              return handler.resolve(cloneReq);
            }
          } catch (refreshError) {
            await SecureStorage.clearTokens();
            // TODO: Navigate to login screen
          }
        }
        return handler.next(e);
      },
    ));
  }

  static Dio get instance => _dio;
}
