#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Define the screens structure based on actual files
screens = {
    'onboarding': [
        ('Welcome', 'v1/screens/auth/welcome.html'),
        ('How It Works', 'v1/screens/auth/how-it-works.html'),
        ('Choose Data', 'v1/screens/auth/choose-data.html'),
        ('Connect Data', 'v1/screens/auth/connect-data.html'),
        ('Success', 'v1/screens/auth/success.html')
    ],
    'authentication': [
        ('Login', 'v1/screens/auth/login.html'),
        ('Create Account', 'v1/screens/auth/create-account.html'),
        ('Email Verification', 'v1/screens/auth/email-verification.html'),
        ('Forgot Password', 'v1/screens/auth/forgot-password.html'),
        ('SSO Apple', 'v1/screens/auth/sso-apple.html'),
        ('SSO Google', 'v1/screens/auth/sso-google.html')
    ],
    'dashboard': [
        ('Dashboard', 'v1/screens/dashboard/main.html'),
        ('Insights', 'v1/screens/insights/main.html')
    ],
    'health': [
        ('Health Overview', 'v1/screens/health/main.html'),
        ('Resilience Score', 'v1/screens/health/resilience-score.html'),
        ('Heart Rate Detail', 'v1/screens/health/heart-rate-detail.html'),
        ('HRV Detail', 'v1/screens/health/hrv-detail.html'),
        ('Sleep Detail', 'v1/screens/health/sleep-detail.html'),
        ('Activity Detail', 'v1/screens/health/activity-detail.html')
    ],
    'rewards': [
        ('Rewards Hub', 'v1/screens/rewards/main.html'),
        ('Earn More', 'v1/screens/rewards/earn-more.html'),
        ('Exchange', 'v1/screens/rewards/exchange.html'),
        ('Withdraw', 'v1/screens/rewards/withdraw.html'),
        ('History', 'v1/screens/rewards/history.html')
    ],
    'profile': [
        ('Profile', 'v1/screens/profile/main.html'),
        ('Personal Info', 'v1/screens/profile/personal-info.html'),
        ('Security', 'v1/screens/profile/security.html'),
        ('Notifications', 'v1/screens/profile/notifications.html'),
        ('Data Permissions', 'v1/screens/profile/data-permissions.html'),
        ('Data Reputation Score', 'v1/screens/profile/data-reputation-score.html'),
        ('Connected Devices', 'v1/screens/profile/connected-devices.html'),
        ('Wallet Connection', 'v1/screens/profile/wallet-connection.html'),
        ('Subscription', 'v1/screens/profile/subscription.html'),
        ('Help Center', 'v1/screens/profile/help-center.html')
    ],
    'errors': [
        ('Empty State', 'v1/screens/errors/empty-state.html'),
        ('Generic Error', 'v1/screens/errors/generic-error.html'),
        ('Network Error', 'v1/screens/errors/network-error.html'),
        ('Permission Denied', 'v1/screens/errors/permission-denied.html'),
        ('Loading', 'v1/screens/errors/loading.html')
    ],
    'legal': [
        ('Terms & Conditions', 'v1/screens/legal/terms.html'),
        ('Privacy Policy', 'v1/screens/legal/privacy.html'),
        ('Security & Compliance', 'v1/screens/legal/security-compliance.html')
    ]
}

def create_svg_wrapper(content, title):
    """Wrap HTML content in an SVG foreignObject"""
    # Clean up the HTML content
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<link[^>]*>', '', content)
    
    # Extract styles
    style_match = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    styles = style_match.group(1) if style_match else ''
    
    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    body_content = body_match.group(1) if body_match else content
    
    svg_template = f'''<svg xmlns="http://www.w3.org/2000/svg" width="393" height="852" viewBox="0 0 393 852">
  <title>{title}</title>
  <defs>
    <style>
      /* Reset styles */
      * {{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }}
      
      /* Original styles */
      {styles}
    </style>
  </defs>
  <foreignObject width="393" height="852">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 393px; height: 852px; background: white; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;">
      {body_content}
    </div>
  </foreignObject>
</svg>'''
    
    return svg_template

def convert_html_to_svg(html_path, svg_path, title):
    """Convert a single HTML file to SVG"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        svg_content = create_svg_wrapper(html_content, title)
        
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        return True
    except Exception as e:
        print(f"Error converting {html_path}: {e}")
        return False

def main():
    """Convert all screens to SVG format"""
    base_dir = Path('.')
    svg_base = Path('svg-export')
    
    total_converted = 0
    total_failed = 0
    
    for category, screen_list in screens.items():
        print(f"\nProcessing {category}...")
        category_dir = svg_base / category
        
        for screen_name, html_path in screen_list:
            html_file = base_dir / html_path
            svg_filename = f"{screen_name.lower().replace(' ', '-')}.svg"
            svg_file = category_dir / svg_filename
            
            if html_file.exists():
                if convert_html_to_svg(html_file, svg_file, screen_name):
                    print(f"  ✓ {screen_name} -> {svg_filename}")
                    total_converted += 1
                else:
                    print(f"  ✗ {screen_name} (conversion failed)")
                    total_failed += 1
            else:
                print(f"  ✗ {screen_name} (file not found: {html_path})")
                total_failed += 1
    
    print(f"\n{'='*50}")
    print(f"Conversion complete!")
    print(f"Total converted: {total_converted}")
    print(f"Total failed: {total_failed}")
    print(f"SVG files saved in: {svg_base.absolute()}")

if __name__ == "__main__":
    main()