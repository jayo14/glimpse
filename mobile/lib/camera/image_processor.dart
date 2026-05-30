import 'dart:io';
import 'package:image/image.dart' as img;
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

class ImageProcessor {
  static Future<File> processImage(String inputPath) async {
    final bytes = await File(inputPath).readAsBytes();
    img.Image? image = img.decodeImage(bytes);
    if (image == null) throw Exception("Failed to decode image");
    img.Image resized = img.copyResize(
      image,
      width: image.width > image.height ? 1920 : null,
      height: image.height >= image.width ? 1080 : null,
    );
    final processedBytes = img.encodeJpg(resized, quality: 85);
    final tempDir = await getTemporaryDirectory();
    final fileName = 'processed_${DateTime.now().millisecondsSinceEpoch}.jpg';
    final outputPath = p.join(tempDir.path, fileName);
    final processedFile = File(outputPath);
    await processedFile.writeAsBytes(processedBytes);
    return processedFile;
  }
}
