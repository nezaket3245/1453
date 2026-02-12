"""
Logo preparation script for Egepen Akçay Yapı website.
Generates: webp logo, png fallback, favicon.ico, apple-touch-icon.png,
           icon-192x192.png, icon-512x512.png from the source logo.
"""
from PIL import Image
import os
import shutil

# Paths
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

# Try to find the source logo
SOURCE_CANDIDATES = [
    os.path.join(os.path.expanduser("~"), "Desktop", "işler", "eski site", "yeni-main", "public", "logo-egepen-akcayapi.png"),
    os.path.join(os.path.expanduser("~"), "Desktop", "işler", "eski site", "yeni-main", "dist", "logo-egepen-akcayapi.png"),
]

source_logo = None
for candidate in SOURCE_CANDIDATES:
    if os.path.exists(candidate):
        source_logo = candidate
        break

if not source_logo:
    print("ERROR: Could not find source logo. Please place logo-egepen-akcayapi.png in the project root.")
    exit(1)

print(f"Found source logo: {source_logo}")

# Open the source logo
img = Image.open(source_logo)
print(f"Original size: {img.size}, mode: {img.mode}")

# Ensure RGBA for transparency support
if img.mode != "RGBA":
    img = img.convert("RGBA")

# 1. Save high-res PNG with transparency as fallback
png_path = os.path.join(IMAGES_DIR, "akcay-yapi-logo.png")
img.save(png_path, "PNG", optimize=True)
print(f"Saved: {png_path}")

# 2. Save WebP (optimized, with transparency)
webp_path = os.path.join(IMAGES_DIR, "akcay-yapi-logo.webp")
img.save(webp_path, "WEBP", quality=90, method=6)
print(f"Saved: {webp_path}")

# 3. Generate favicon.ico (multi-size: 16, 32, 48)
# Create a square crop/pad for favicon
def make_square(image, size):
    """Resize image to fit within a square, maintaining aspect ratio, with padding."""
    w, h = image.size
    ratio = min(size / w, size / h)
    new_w = int(w * ratio)
    new_h = int(h * ratio)
    resized = image.resize((new_w, new_h), Image.LANCZOS)
    # Create transparent square canvas
    square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # Center the logo
    offset_x = (size - new_w) // 2
    offset_y = (size - new_h) // 2
    square.paste(resized, (offset_x, offset_y), resized)
    return square

# Favicon sizes
favicon_16 = make_square(img, 16)
favicon_32 = make_square(img, 32)
favicon_48 = make_square(img, 48)

# Save favicon.ico (multi-resolution)
favicon_path = os.path.join(PUBLIC_DIR, "favicon.ico")
favicon_32.save(favicon_path, "ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"Saved: {favicon_path}")

# Also save to src/app/favicon.ico for Next.js automatic detection
src_favicon_path = os.path.join(PROJECT_ROOT, "src", "app", "favicon.ico")
shutil.copy2(favicon_path, src_favicon_path)
print(f"Copied: {src_favicon_path}")

# 4. Apple Touch Icon (180x180 PNG)
apple_icon = make_square(img, 180)
# Apple touch icons work better with a solid background
apple_with_bg = Image.new("RGBA", (180, 180), (0, 85, 165, 255))  # #0055a5 brand color
apple_with_bg.paste(apple_icon, (0, 0), apple_icon)
apple_path = os.path.join(IMAGES_DIR, "apple-touch-icon.png")
apple_with_bg.save(apple_path, "PNG", optimize=True)
print(f"Saved: {apple_path}")

# 5. PWA icons (192x192 and 512x512)
icon_192 = make_square(img, 192)
icon_192_path = os.path.join(IMAGES_DIR, "icon-192x192.png")
icon_192.save(icon_192_path, "PNG", optimize=True)
print(f"Saved: {icon_192_path}")

icon_512 = make_square(img, 512)
icon_512_path = os.path.join(IMAGES_DIR, "icon-512x512.png")
icon_512.save(icon_512_path, "PNG", optimize=True)
print(f"Saved: {icon_512_path}")

# 6. OG Image version (wider, with brand background, 1200x630)
og_w, og_h = 1200, 630
og_img = Image.new("RGBA", (og_w, og_h), (0, 85, 165, 255))  # Brand blue background
# Scale logo to fit nicely (60% of height)
logo_target_h = int(og_h * 0.5)
w, h = img.size
ratio = logo_target_h / h
logo_resized = img.resize((int(w * ratio), logo_target_h), Image.LANCZOS)
# Center
offset_x = (og_w - logo_resized.width) // 2
offset_y = (og_h - logo_resized.height) // 2
og_img.paste(logo_resized, (offset_x, offset_y), logo_resized)
og_path = os.path.join(IMAGES_DIR, "og-logo.png")
og_img.save(og_path, "PNG", optimize=True)
print(f"Saved: {og_path}")

print("\n✅ All logo assets generated successfully!")
print(f"  - akcay-yapi-logo.webp (header logo)")
print(f"  - akcay-yapi-logo.png (fallback)")
print(f"  - favicon.ico (browser tab)")
print(f"  - apple-touch-icon.png (iOS)")
print(f"  - icon-192x192.png (PWA)")
print(f"  - icon-512x512.png (PWA)")
print(f"  - og-logo.png (social share)")
