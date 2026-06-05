class UserModel {
  final String id;
  final String email;

  UserModel({required this.id, required this.email});

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      email: json['email'] as String,
    );
  }
}

class AuthResponse {
  final bool success;
  final String message;
  final UserModel? user;
  final String? accessToken;
  final bool emailConfirmationRequired;

  AuthResponse({
    required this.success,
    required this.message,
    this.user,
    this.accessToken,
    this.emailConfirmationRequired = false,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      success: json['success'] ?? true,
      message: json['message'] ?? '',
      user: json['user'] != null ? UserModel.fromJson(json['user']) : null,
      accessToken: json['access_token'] as String?,
      emailConfirmationRequired: json['email_confirmation_required'] ?? false,
    );
  }
}
