from PIL import Image
import io
import os
from django.core.files.base import ContentFile

def remove_exif(image_file):
    """
    Removes EXIF data from an image file in memory by saving it to a new buffer
    without EXIF metadata.
    """
    image = Image.open(image_file)
    output = io.BytesIO()
    # image.save without 'exif' parameter removes EXIF
    image.save(output, format=image.format)
    output.seek(0)
    return ContentFile(output.read(), name=image_file.name)
