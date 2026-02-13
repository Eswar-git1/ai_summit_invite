from PIL import Image
import numpy as np

def remove_white_background_aggressive(input_path, output_path):
    """Remove white background from an image and make it transparent - aggressive mode"""
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGBA if not already
    img = img.convert("RGBA")
    
    # Get the image data
    data = np.array(img)
    
    # More aggressive white removal - lower threshold
    # This will catch white and near-white pixels
    threshold = 200  # Lower threshold to catch off-white too
    
    white_mask = (data[:, :, 0] > threshold) & \
                 (data[:, :, 1] > threshold) & \
                 (data[:, :, 2] > threshold)
    
    # Set alpha channel to 0 for white pixels
    data[white_mask, 3] = 0
    
    # Create new image from modified data
    result = Image.fromarray(data)
    
    # Save as PNG with transparency
    result.save(output_path, 'PNG')
    print(f"Saved transparent image to: {output_path}")

# Process DGIS logo with more aggressive white removal
print("Processing DGIS logo with aggressive white removal...")
remove_white_background_aggressive(
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\images\DGIS Logo.png",
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\defence-panel-rsvp\public\images\DGIS-logo-transparent.png"
)

print("\nDone! DGIS logo now has transparent background.")
