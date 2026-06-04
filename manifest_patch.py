content = open('mobile/android/app/src/main/AndroidManifest.xml').read()

permissions = """
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
    <uses-permission android:name="android.permission.READ_MEDIA_VISUAL_USER_SELECTED" />
"""

if '<uses-permission' not in content:
    content = content.replace('<manifest', '<manifest' + permissions)

with open('mobile/android/app/src/main/AndroidManifest.xml', 'w') as f:
    f.write(content)
