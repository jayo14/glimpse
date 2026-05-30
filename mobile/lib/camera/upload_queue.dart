import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'dart:io';
import '../shared/api_client.dart';

class UploadQueue {
  static Database? _database;
  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDb();
    return _database!;
  }
  static Future<Database> _initDb() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'upload_queue.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('CREATE TABLE uploads(id INTEGER PRIMARY KEY AUTOINCREMENT, file_path TEXT, event_id TEXT, status TEXT)');
      },
    );
  }
  static Future<void> addToQueue(String filePath, String eventId) async {
    final db = await database;
    await db.insert('uploads', {'file_path': filePath, 'event_id': eventId, 'status': 'pending'});
    _processQueue();
  }
  static Future<void> _processQueue() async {
    final db = await database;
    final List<Map<String, dynamic>> pending = await db.query('uploads', where: 'status = ?', whereArgs: ['pending']);
    for (var item in pending) {
      final id = item['id'];
      final filePath = item['file_path'];
      final eventId = item['event_id'];
      try {
        if (await File(filePath).exists()) {
          final response = await ApiClient.multipartPost('/events/$eventId/upload/', filePath, {'event_id': eventId});
          if (response.statusCode == 201 || response.statusCode == 200) {
            await db.delete('uploads', where: 'id = ?', whereArgs: [id]);
          }
        }
      } catch (_) {}
    }
  }
}
