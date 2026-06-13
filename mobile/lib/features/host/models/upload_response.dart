class UploadResponse {
  final String uploadUrl;
  final String storagePath;
  final UploadMetrics? metrics;

  UploadResponse({
    required this.uploadUrl,
    required this.storagePath,
    this.metrics,
  });

  factory UploadResponse.fromJson(Map<String, dynamic> json) {
    return UploadResponse(
      uploadUrl: json['uploadUrl'] ?? json['upload_url'] as String,
      storagePath: json['storagePath'] ?? json['storage_path'] as String,
      metrics: json['metrics'] != null ? UploadMetrics.fromJson(json['metrics']) : null,
    );
  }
}

class UploadMetrics {
  final int limit;
  final int totalUploaded;

  UploadMetrics({
    required this.limit,
    required this.totalUploaded,
  });

  factory UploadMetrics.fromJson(Map<String, dynamic> json) {
    return UploadMetrics(
      limit: json['limit'] as int,
      totalUploaded: json['totalUploaded'] ?? json['total_uploaded'] as int,
    );
  }
}
