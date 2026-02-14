from PIL import Image
import numpy as np

def remove_white_background(input_path, output_path, threshold=240):
    """Remove white background from an image and make it transparent"""
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGBA if not already
    img = img.convert("RGBA")
    
    # Get the image data
    data = np.array(img)
    
    # Create a mask for white pixels (all RGB values above threshold)
    # This will catch white and near-white pixels
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

# Process Indian Army logo
print("Processing Indian Army logo...")
remove_white_background(
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\images\indian-army-logo.webp",
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\defence-panel-rsvp\public\images\indian-army-logo-transparent.png",
    threshold=240
)

# Process DGIS logo
print("Processing DGIS logo...")
remove_white_background(
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\images\DGIS Logo.png",
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\defence-panel-rsvp\public\images\DGIS-logo-transparent.png",
    threshold=240
)

print("\nDone! Both logos now have transparent backgrounds.")
