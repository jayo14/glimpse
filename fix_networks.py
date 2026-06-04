import re

def add_error_builder(file_path):
    content = open(file_path).read()
    # Simple regex to find Image.network without errorBuilder and add it
    # This is a bit risky but we can try to target specific blocks

    pattern = r'(Image\.network\(\s*.*?\s*)(,\s*\))'
    replacement = r'\1, errorBuilder: (c, e, s) => Container(color: Colors.black12, child: const Icon(Icons.image_not_supported_outlined, color: Colors.white10, size: 24))\2'

    # We should be more careful and only replace where it makes sense
    if 'Image.network' in content and 'errorBuilder' not in content:
        # Special case for event_landing_screen.dart
        if 'event_landing_screen.dart' in file_path:
             content = content.replace("fit: BoxFit.cover,", "fit: BoxFit.cover, errorBuilder: (c,e,s) => Container(color: Colors.black, child: const Center(child: Icon(Icons.image_outlined, color: Colors.white10, size: 64))),")
        elif 'album_archive_screen.dart' in file_path:
             content = content.replace("fit: BoxFit.cover),", "fit: BoxFit.cover, errorBuilder: (c,e,s) => Container(color: Colors.black26, child: const Center(child: Icon(Icons.image_outlined, color: Colors.white10)))),")

    with open(file_path, 'w') as f:
        f.write(content)

add_error_builder('mobile/lib/features/guest/event_landing_screen.dart')
add_error_builder('mobile/lib/features/host/album_archive_screen.dart')
