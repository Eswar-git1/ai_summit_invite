from PIL import Image
import numpy as np

def remove_white_and_crop(input_path, output_path):
    """Remove white background and crop to just the circular emblem"""
    # Open the image
    img = Image.open(input_path)
    
    # Convert to RGBA
    img = img.convert("RGBA")
    
    # Get the image data
    data = np.array(img)
    
    # Very aggressive white removal - catches anything light colored
    threshold = 180  # Even lower threshold
    
    # Create mask for white/light pixels
    white_mask = (data[:, :, 0] > threshold) & \
                 (data[:, :, 1] > threshold) & \
                 (data[:, :, 2] > threshold)
    
    # Set alpha to 0 for white pixels
    data[white_mask, 3] = 0
    
    # Create image from modified data
    result = Image.fromarray(data)
    
    # Get the bounding box of non-transparent pixels
    bbox = result.getbbox()
    
    if bbox:
        # Crop to the bounding box (removes excess transparent space)
        result = result.crop(bbox)
    
    # Save as PNG
    result.save(output_path, 'PNG')
    print(f"Saved cropped transparent image to: {output_path}")
    print(f"Original size: {img.size}, New size: {result.size}")

# Process DGIS logo
print("Processing DGIS logo - removing white and cropping...")
remove_white_and_crop(
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\images\DGIS Logo.png",
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\defence-panel-rsvp\public\images\DGIS-logo-transparent.png"
)

# Process Indian Army logo too for consistency
print("\nProcessing Indian Army logo - removing white and cropping...")
remove_white_and_crop(
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\images\indian-army-logo.webp",
    r"c:\Users\Sarvam AI\Desktop\AI Summit Web Invite\defence-panel-rsvp\public\images\indian-army-logo-transparent.png"
)

print("\nDone! Both logos now have transparent backgrounds and are cropped.")
