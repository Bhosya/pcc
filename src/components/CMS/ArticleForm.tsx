import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Image as ImageIcon, X } from "lucide-react";

interface ArticleFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);

      // Create preview URLs
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]); // Clean up the URL
      return newPreviews.filter((_, i) => i !== index);
    });
  };

  const uploadToImgur = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Imgur");
    }

    const data = await response.json();
    return data.data.link;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to create an article",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Validate form
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your article",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for your article",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload all images to Imgur in parallel
      const imageUploadPromises = images.map(uploadToImgur);
      const imageUrls = await Promise.all(imageUploadPromises);

      // Save article to Firestore
      const articleRef = await addDoc(collection(db, "articles"), {
        title: title.trim(),
        content: content.trim(),
        imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        status: "draft",
      });

      toast({
        title: "Success",
        description: "Article created successfully!",
      });

      // Reset form
      setTitle("");
      setContent("");
      setImages([]);
      setImagePreviews([]);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error creating article:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create article",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 transition-all duration-300"
          placeholder="Enter article title"
          required
        />
      </div>

      {/* Content Input */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-gray-700/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 transition-all duration-300 min-h-[200px]"
          placeholder="Write your article content here..."
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        <div className="space-y-4">
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <label
            htmlFor="images"
            className="flex-1 bg-gray-700/50 border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-gray-700/70 transition-colors"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8 text-white/60" />
              <span className="text-sm text-white/60">
                Click to upload images
              </span>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white/60 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-neonBlue hover:bg-neonBlue/90 text-darkBlue rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Article"
          )}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
