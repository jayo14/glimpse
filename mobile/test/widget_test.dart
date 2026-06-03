import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:glimpse_mobile/main.dart';

void main() {
  testWidgets('App should load splash screen', (WidgetTester tester) async {
    await tester.pumpWidget(const ProviderScope(child: GlimpseApp()));
    expect(find.text('Glimpse'), findsOneWidget);
  });
}
