import { UploadCloudIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
// import { Skeleton } from "@/components/ui/skeleton"

const ImageUpload = ({ isEditMode, imageFile, setImageFile, uploadImgUrl, setImgUploadUrl, setImageLoadingState, imagLoadingState }) => {
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const fileURL = URL.createObjectURL(file);
            setImgUploadUrl(fileURL);
        }
    };

    const handleDrag = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const dropFile = event.dataTransfer.files[0];
        if (dropFile) {
            setImageFile(dropFile);
        }
    };

    const uploadImageToCloudinary = async () => {
        const data = new FormData();
        data.append('my_file', imageFile);

        try {
            setImageLoadingState(true);
            const response = await fetch("http://localhost:5000/api/admin/societies/upload-image", {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            console.log('response', result);

            if (response.ok && result && result.result && result.result.url) {
                setImgUploadUrl(result.result.url);
                setImageLoadingState(false);
            } else {
                console.error('Image upload failed:', result.message || 'No URL returned');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div>
            <label className='block mb-3 text-[#4880FF]'>Upload Image</label>
            <div
                className='border-2 border-dashed border-[#4880FF]  rounded-lg p-4 bg-gray-800'
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    className='border rounded-md p-2 w-full hidden'
                    onChange={handleFileChange}
                    ref={inputRef}
                    

                />
                {
                    !imageFile ? (
                        <label
                            htmlFor='image-upload'
                            className='flex flex-col justify-center items-center h-32 cursor-pointer'
                            onClick={() => inputRef.current.click()}
                            
                        >
                            <UploadCloudIcon className='w-10 h-10 hover:text-teal-600 mb-2 flex items-center justify-center text-gray-400 ' />
                            <span className='text-gray-400 hover:text-teal-600'>Drag & drop or click to upload image</span>
                        </label>
                    ) : (
                        
                        <div className='flex flex-col items-center'>
                            <img src={uploadImgUrl} alt="Uploaded preview" className='h-52 w-60 rounded-md mb-2' />
                            <button
                                type="button"
                                className='text-red-500 hover:text-red-400'
                                onClick={() => {
                                    setImageFile(null); // Clear the selected image
                                    setImgUploadUrl(''); // Clear the URL
                                }}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ImageUpload;
