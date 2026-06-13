class AccessResponse {
  final String eventId;
  final String title;
  final String? inviteToken;
  final int limit;
  final bool isAuthenticatedGuest;

  AccessResponse({
    required this.eventId,
    required this.title,
    this.inviteToken,
    required this.limit,
    required this.isAuthenticatedGuest,
  });

  factory AccessResponse.fromJson(Map<String, dynamic> json) {
    return AccessResponse(
      eventId: json['eventId'] as String,
      title: json['title'] as String,
      inviteToken: json['inviteToken'] as String?,
      limit: json['limit'] as int? ?? 15,
      isAuthenticatedGuest: json['isAuthenticatedGuest'] as bool? ?? false,
    );
  }
}
