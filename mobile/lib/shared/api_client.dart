import 'dart:convert';
import 'package:http/http.dart' as http;
import 'storage_service.dart';

class ApiClient {
  static const String baseUrl = 'http://localhost:8000/api/v1';

  static Future<http.Response> get(String endpoint, {bool authenticated = true}) async {
    final headers = await _getHeaders(authenticated);
    return http.get(Uri.parse('$baseUrl$endpoint'), headers: headers);
  }

  static Future<http.Response> post(String endpoint, Map<String, dynamic> body, {bool authenticated = true}) async {
    final headers = await _getHeaders(authenticated);
    return http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
      body: jsonEncode(body),
    );
  }

  static Future<http.Response> multipartPost(String endpoint, String filePath, Map<String, String> fields, {bool authenticated = false}) async {
    final uri = Uri.parse('$baseUrl$endpoint');
    final request = http.MultipartRequest('POST', uri);
    if (authenticated) {
      final token = await StorageService.getToken();
      if (token != null) request.headers['Authorization'] = 'Bearer $token';
    }
    request.fields.addAll(fields);
    request.files.add(await http.MultipartFile.fromPath('file', filePath));
    final streamedResponse = await request.send();
    return http.Response.fromStream(streamedResponse);
  }

  static Future<Map<String, String>> _getHeaders(bool authenticated) async {
    final Map<String, String> headers = {'Content-Type': 'application/json'};
    if (authenticated) {
      final token = await StorageService.getToken();
      if (token != null) headers['Authorization'] = 'Bearer $token';
    }
    return headers;
  }
}
