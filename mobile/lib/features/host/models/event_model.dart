class EventModel {
  final String id;
  final String hostId;
  final String title;
  final String? description;
  final String? location;
  final int guestPhotoLimit;
  final DateTime? eventStart;
  final DateTime? eventEnd;
  final String? qrCodeUrl;
  final String? inviteToken;
  final bool isActive;
  final DateTime createdAt;

  EventModel({
    required this.id,
    required this.hostId,
    required this.title,
    this.description,
    this.location,
    required this.guestPhotoLimit,
    this.eventStart,
    this.eventEnd,
    this.qrCodeUrl,
    this.inviteToken,
    required this.isActive,
    required this.createdAt,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      id: json['id'] as String,
      hostId: json['hostId'] ?? json['host_id'] as String,
      title: json['title'] as String,
      description: json['description'] as String?,
      location: json['location'] as String?,
      guestPhotoLimit: json['guestPhotoLimit'] ?? json['guest_photo_limit'] as int? ?? 15,
      eventStart: json['eventStart'] != null || json['event_start'] != null
          ? DateTime.parse(json['eventStart'] ?? json['event_start'])
          : null,
      eventEnd: json['eventEnd'] != null || json['event_end'] != null
          ? DateTime.parse(json['eventEnd'] ?? json['event_end'])
          : null,
      qrCodeUrl: json['qrCodeUrl'] ?? json['qr_code_url'] as String?,
      inviteToken: json['inviteToken'] ?? json['invite_token'] as String?,
      isActive: json['isActive'] ?? json['is_active'] as bool? ?? true,
      createdAt: DateTime.parse(json['createdAt'] ?? json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'host_id': hostId,
      'title': title,
      'description': description,
      'location': location,
      'guest_photo_limit': guestPhotoLimit,
      'event_start': eventStart?.toIso8601String(),
      'event_end': eventEnd?.toIso8601String(),
      'qr_code_url': qrCodeUrl,
      'invite_token': inviteToken,
      'is_active': isActive,
      'created_at': createdAt.toIso8601String(),
    };
  }
}
