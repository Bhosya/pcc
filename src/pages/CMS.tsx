import React, { useState, useEffect } from "react";
import {
  Plus,
  Save,
  Trash2,
  Edit2,
  Eye,
  Layout,
  LogOut,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Editor from "@/components/Editor";
import { createArticle, getAllArticles, logout } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

interface Article {
  id: string;
  title: string;
  content: string;
  bannerImage: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published";
  authorId: string;
  authorName: string;
}

const CMS = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load articles from Firestore
  useEffect(() => {
    const loadArticles = async () => {
      const { articles, error } = await getAllArticles();
      if (error) {
        setError(error);
        toast({
          title: "Error",
          description: "Failed to load articles. Please try again.",
          variant: "destructive",
        });
      } else {
        setArticles(articles as Article[]);
      }
      setLoading(false);
    };

    loadArticles();
  }, [toast]);

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setArticleTitle("");
    setEditorContent("");
    setBannerImage(null);
    setBannerImagePreview("");
    setIsEditorOpen(true);
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setArticleTitle(article.title);
    setEditorContent(article.content);
    setBannerImagePreview(article.bannerImage || "");
    setIsEditorOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setBannerImagePreview(previewUrl);
    }
  };

  const handleSaveArticle = async () => {
    if (!articleTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your article",
        variant: "destructive",
      });
      return;
    }

    if (!bannerImage && !bannerImagePreview) {
      toast({
        title: "Error",
        description: "Please add a banner image for your article",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { id, error } = await createArticle(
        {
          title: articleTitle,
          content: editorContent,
          status: "draft",
          authorId: "current-user-id", // Replace with actual user ID
          authorName: "Current User", // Replace with actual user name
        },
        bannerImage
      );

      if (error) {
        setError(error);
        toast({
          title: "Error",
          description: "Failed to save article. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Refresh articles list
      const { articles: updatedArticles } = await getAllArticles();
      setArticles(updatedArticles as Article[]);

      toast({
        title: "Success",
        description: "Article saved successfully!",
      });

      // Reset form and close editor
      setIsEditorOpen(false);
      setSelectedArticle(null);
      setArticleTitle("");
      setEditorContent("");
      setBannerImage(null);
      setBannerImagePreview("");
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      // TODO: Implement delete functionality
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  const handlePublishArticle = async (id: string) => {
    // TODO: Implement publish functionality
    setArticles(
      articles.map((article) =>
        article.id === id ? { ...article, status: "published" } : article
      )
    );
  };

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      setError(error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBlue flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-neonBlue animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBlue font-inter text-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neonBlue/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neonBlue/5 via-transparent to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-neonBlue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-neonBlue/5 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Layout className="w-8 h-8 text-neonBlue" />
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Content Management System
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
          <p className="text-white/60 text-lg max-w-2xl">
            Kelola dan publikasikan artikel untuk blog PCC dengan mudah. Buat,
            edit, dan atur status artikel Anda di sini.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-20 relative">
        {/* Decorative Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-neonBlue/50 to-transparent" />

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {isEditorOpen ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/10 shadow-xl">
            <div className="mb-6">
              <input
                type="text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Enter article title..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 transition-all duration-300"
              />
            </div>

            {/* Banner Image Upload */}
            <div>
              <label className="block text-white/80 mb-2">Banner Image</label>
              <div className="relative">
                {bannerImagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-2">
                    <img
                      src={bannerImagePreview}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setBannerImagePreview("");
                        setBannerImage(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-neonBlue/50 transition-colors mb-2">
                    <label className="flex flex-col items-center cursor-pointer">
                      <ImageIcon className="h-8 w-8 text-white/50 mb-2" />
                      <span className="text-white/60">
                        Click to upload banner image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <Editor value={editorContent} onChange={setEditorContent} />
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsEditorOpen(false)}
                className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveArticle}
                className="bg-neonBlue hover:bg-neonBlue/90 text-darkBlue px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-neonBlue/20"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Article
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-neonBlue/50 transition-all duration-300 hover:shadow-xl hover:shadow-neonBlue/5"
              >
                {/* Banner Image */}
                <div className="relative w-full h-48">
                  {article.bannerImage && (
                    <img
                      src={article.bannerImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/80 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold group-hover:text-neonBlue transition-colors duration-300">
                      {article.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        article.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mb-6">
                    Last updated:{" "}
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="p-2 text-white/60 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 text-white/60 hover:text-red-400 transition-colors hover:bg-white/10 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {article.status === "draft" && (
                        <button
                          onClick={() => handlePublishArticle(article.id)}
                          className="p-2 text-white/60 hover:text-green-400 transition-colors hover:bg-white/10 rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* New Article Card */}
            <div
              onClick={handleNewArticle}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-white/20 hover:border-neonBlue/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[280px] hover:shadow-xl hover:shadow-neonBlue/5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-neonBlue/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Plus className="h-16 w-16 text-neonBlue relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-white/80 text-xl font-medium mt-6 group-hover:text-neonBlue transition-colors duration-300">
                Create New Article
              </span>
              <p className="text-white/40 text-sm text-center mt-2 max-w-[200px]">
                Mulai menulis artikel baru untuk dibagikan di blog PCC
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer Section with Pattern */}
      <div className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMS;
