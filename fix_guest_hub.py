content = open('mobile/lib/features/guest/guest_hub_screen.dart').read()

# The methods were accidentally inserted into the _SmallGlassButton class or outside the _GuestHubScreenState
# Let's fix the structure.

import re

# Remove the incorrectly placed methods if any
# Find the start of _GuestHubScreenState
state_start = content.find('class _GuestHubScreenState extends State<GuestHubScreen>')
if state_start != -1:
    # Find the first { after state_start
    first_brace = content.find('{', state_start)

    # Define the methods
    settings_methods = """
  void _showSettingsSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: const Color(0xFF1A1A1C),
          borderRadius: BorderRadius.vertical(top: Radius.circular(24.h(context))),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
        ),
        padding: EdgeInsets.symmetric(horizontal: 24.w(context), vertical: 24.h(context)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40.w(context),
              height: 4.h(context),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 24.h(context)),
            Text(
              'Settings',
              style: TextStyle(
                fontFamily: 'EB Garamond',
                fontSize: 24.sp(context),
                color: Colors.white,
              ),
            ),
            SizedBox(height: 24.h(context)),
            _buildSettingsOption(
              context,
              Icons.face_retouching_natural,
              'Change Selfie Link',
              'Update your face matching profile',
              () => Navigator.pop(context),
            ),
            _buildSettingsOption(
              context,
              Icons.delete_outline,
              'Privacy & Data Purge',
              'Delete your photos from our servers',
              () => Navigator.pop(context),
              isDestructive: true,
            ),
            _buildSettingsOption(
              context,
              Icons.help_outline,
              'Help & Support',
              'Get assistance with your gallery',
              () => Navigator.pop(context),
            ),
            SizedBox(height: 32.h(context)),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingsOption(
    BuildContext context,
    IconData icon,
    String title,
    String subtitle,
    VoidCallback onTap, {
    bool isDestructive = false,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h(context)),
        padding: EdgeInsets.all(16.h(context)),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(16.h(context)),
          border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
        ),
        child: Row(
          children: [
            Container(
              width: 40.h(context),
              height: 40.h(context),
              decoration: BoxDecoration(
                color: isDestructive
                    ? Colors.red.withValues(alpha: 0.1)
                    : Colors.white.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                color: isDestructive ? Colors.redAccent : Colors.white,
                size: 20,
              ),
            ),
            SizedBox(width: 16.w(context)),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15.sp(context),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: TextStyle(
                      color: GlimpseColors.coolGray,
                      fontSize: 12.sp(context),
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right,
              color: Colors.white.withValues(alpha: 0.3),
              size: 16,
            ),
          ],
        ),
      ),
    );
  }
"""
    # Clean up the previous bad insertion first
    content = re.sub(r'void _showSettingsSheet\(BuildContext context\) \{.*?\}\n\n  Widget _buildSettingsOption\(.*?\}\n', '', content, flags=re.DOTALL)

    # Re-insert at the right place
    content = content[:first_brace+1] + settings_methods + content[first_brace+1:]

with open('mobile/lib/features/guest/guest_hub_screen.dart', 'w') as f:
    f.write(content)
