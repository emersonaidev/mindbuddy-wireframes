#!/usr/bin/env python3
import os
import re
from pathlib import Path
from html.parser import HTMLParser

class HTMLToSVGConverter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.svg_elements = []
        self.current_y = 20
        self.current_x = 20
        self.text_content = ""
        self.in_body = False
        self.skip_tags = {'script', 'style', 'meta', 'link'}
        self.current_tag = None
        self.tag_stack = []
        
    def handle_starttag(self, tag, attrs):
        if tag == 'body':
            self.in_body = True
        
        if not self.in_body or tag in self.skip_tags:
            return
            
        self.tag_stack.append(tag)
        self.current_tag = tag
        
        # Handle specific tags
        if tag in ['div', 'section', 'header', 'main', 'footer']:
            self.current_y += 10
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.current_y += 20
        elif tag == 'p':
            self.current_y += 15
        elif tag == 'button':
            # Draw button rectangle
            self.svg_elements.append(
                f'<rect x="{self.current_x}" y="{self.current_y}" '
                f'width="120" height="40" rx="8" '
                f'fill="#007AFF" stroke="none"/>'
            )
        elif tag == 'input':
            # Draw input field
            attr_dict = dict(attrs)
            input_type = attr_dict.get('type', 'text')
            if input_type in ['text', 'email', 'password']:
                self.svg_elements.append(
                    f'<rect x="{self.current_x}" y="{self.current_y}" '
                    f'width="353" height="48" rx="8" '
                    f'fill="none" stroke="#E5E5E5" stroke-width="1"/>'
                )
                if 'placeholder' in attr_dict:
                    self.svg_elements.append(
                        f'<text x="{self.current_x + 16}" y="{self.current_y + 30}" '
                        f'font-family="-apple-system, sans-serif" font-size="16" fill="#999">'
                        f'{attr_dict["placeholder"]}</text>'
                    )
                self.current_y += 60
    
    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
            
        if tag in ['div', 'section', 'p']:
            self.current_y += 10
            
    def handle_data(self, data):
        if not self.in_body or not data.strip():
            return
            
        if self.current_tag in self.skip_tags:
            return
            
        # Clean the text
        text = data.strip()
        if not text:
            return
            
        # Determine text styling based on parent tag
        font_size = 16
        font_weight = "normal"
        fill = "#000"
        
        if self.current_tag == 'h1':
            font_size = 32
            font_weight = "bold"
        elif self.current_tag == 'h2':
            font_size = 24
            font_weight = "bold"
        elif self.current_tag == 'h3':
            font_size = 20
            font_weight = "600"
        elif self.current_tag == 'button':
            fill = "#FFF"
            font_weight = "600"
        elif self.current_tag in ['p', 'span']:
            fill = "#666"
            
        # Add text element
        self.svg_elements.append(
            f'<text x="{self.current_x}" y="{self.current_y}" '
            f'font-family="-apple-system, sans-serif" font-size="{font_size}" '
            f'font-weight="{font_weight}" fill="{fill}">'
            f'{text}</text>'
        )
        
        if self.current_tag not in ['span', 'a', 'button']:
            self.current_y += font_size + 10

def create_clean_svg(html_content, title):
    """Convert HTML to clean SVG without foreignObject"""
    
    # Parse HTML
    parser = HTMLToSVGConverter()
    parser.feed(html_content)
    
    # Create SVG
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="393" height="852" viewBox="0 0 393 852">
  <title>{title}</title>
  
  <!-- Background -->
  <rect width="393" height="852" fill="#FFFFFF"/>
  
  <!-- Status Bar -->
  <g id="status-bar">
    <rect x="0" y="0" width="393" height="47" fill="#FFFFFF"/>
    <text x="30" y="30" font-family="-apple-system" font-size="15" font-weight="600">9:41</text>
    <g transform="translate(340, 15)">
      <!-- Battery -->
      <rect x="0" y="0" width="24" height="12" rx="2" fill="none" stroke="#000" stroke-width="1"/>
      <rect x="2" y="2" width="16" height="8" fill="#000"/>
      <rect x="24" y="4" width="2" height="4" fill="#000"/>
    </g>
  </g>
  
  <!-- Content -->
  <g transform="translate(0, 47)">
    {''.join(parser.svg_elements)}
  </g>
  
  <!-- Navigation Bar (if mobile) -->
  <g id="nav-bar" transform="translate(0, 785)">
    <rect x="0" y="0" width="393" height="67" fill="#F8F8F8"/>
    <rect x="171" y="54" width="50" height="4" rx="2" fill="#000" opacity="0.3"/>
  </g>
</svg>'''
    
    return svg_content

def convert_to_svg_clean(html_path, svg_path, title):
    """Convert HTML to clean SVG"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        svg_content = create_clean_svg(html_content, title)
        
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        return True
    except Exception as e:
        print(f"Error converting {html_path}: {e}")
        return False

# Define the screens structure
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

def main():
    """Convert all screens to clean SVG format"""
    base_dir = Path('.')
    svg_base = Path('svg-export-clean')
    
    # Create directories
    for category in screens.keys():
        (svg_base / category).mkdir(parents=True, exist_ok=True)
    
    total_converted = 0
    total_failed = 0
    
    print("Converting to clean SVG format...")
    
    for category, screen_list in screens.items():
        print(f"\nProcessing {category}...")
        category_dir = svg_base / category
        
        for screen_name, html_path in screen_list:
            html_file = base_dir / html_path
            svg_filename = f"{screen_name.lower().replace(' ', '-')}.svg"
            svg_file = category_dir / svg_filename
            
            if html_file.exists():
                if convert_to_svg_clean(html_file, svg_file, screen_name):
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