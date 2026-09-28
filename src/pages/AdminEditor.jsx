import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getPostByIdAdmin } from "../lib/api.js";

export default function AdminEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [isPaywalled, setIsPaywalled] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      getPostByIdAdmin(id).then((post) => {
        setTitle(post.title);
        setSubtitle(post.subtitle || "");
        setContent(post.content);
        setIsPaywalled(Boolean(post.is_paywalled));
        setExistingImageUrl(post.cover_image_url);
      });
    }
  }, [id, isEditing]);

  async function handleSave(status) {
    setError("");
    setSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("isPaywalled", isPaywalled);
    formData.append("status", status);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      if (isEditing) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      navigate("/sb-portal-x7k2/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-2xl italic text-accent">
        {isEditing ? "Edit post" : "New post"}
      </h1>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />

        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle"
          className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />

        <div>
          <label className="block text-sm text-muted">Cover image</label>
          {existingImageUrl && !coverImage && (
            <img
              src={existingImageUrl}
              alt="Current cover"
              className="mt-2 h-32 w-32 rounded-md object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="mt-2 text-sm"
          />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          rows={14}
          className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={isPaywalled}
            onChange={(e) => setIsPaywalled(e.target.checked)}
          />
          Paywall this post
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="rounded-md border border-line px-4 py-2 text-sm text-ink disabled:opacity-50"
          >
            Save as draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}