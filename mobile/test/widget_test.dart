import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/main.dart';
import 'package:mobile/shared/splash_screen.dart';

void main() {
  testWidgets('App starts with SplashScreen', (WidgetTester tester) async {
    await tester.runAsync(() async {
       await tester.pumpWidget(const GlimpseApp());
       expect(find.byType(SplashScreen), findsOneWidget);
    });
  });
}
