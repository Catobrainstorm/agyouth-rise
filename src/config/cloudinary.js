export const CLOUDINARY_CONFIG = {
  cloudName: "dspvpqj44",
  uploadPreset: "YOUR_UPLOAD_PRESET_NAME", // Replace with the preset name from Step 1
  apiUrl: "https://api.cloudinary.com/v1_1"
};

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    try {
        const response = await fetch(
        `${CLOUDINARY_CONFIG.apiUrl}/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData
        }
        );
        
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};