import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createPost, updatePost, getPostByIdAdmin } from "../lib/api.js";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkBreaks from "remark-breaks";

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "u"],
};

// same spacing as the blog post page, so the preview matches
const mdComponents = {
  p: ({ node, ...props }) => <p className="mt-4 first:mt-0" {...props} />,
  a: ({ node, ...props }) => <a className="underline" {...props} />,
  h2: ({ node, ...props }) => (
    <h2 className="mt-6 text-lg font-semibold" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="mt-4 list-disc pl-5" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="mt-4 list-decimal pl-5" {...props} />
  ),
};

const MARKERS = {
  bold: ["**", "**"],
  italic: ["*", "*"],
  underline: ["<u>", "</u>"],
};
const NO_VALUE = [];

export default function AdminEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [isPaywalled, setIsPaywalled] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

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

  function applyFormat(type) {
    const el = textareaRef.current;
    if (!el) return;

    const { selectionStart: start, selectionEnd: end } = el;
    const [open, close] = MARKERS[type];
    const selected = content.slice(start, end);

    setContent(
      content.slice(0, start) + open + selected + close + content.slice(end)
    );

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + open.length, end + open.length);
    });
  }

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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <ToggleGroup
              value={NO_VALUE}
              onMouseDown={(e) => e.preventDefault()}
            >
              <ToggleGroupItem
                aria-label="Bold"
                value="bold"
                disabled={showPreview}
                onClick={() => applyFormat("bold")}
              >
                <BoldIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                aria-label="Italic"
                value="italic"
                disabled={showPreview}
                onClick={() => applyFormat("italic")}
              >
                <ItalicIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                aria-label="Underline"
                value="underline"
                disabled={showPreview}
                onClick={() => applyFormat("underline")}
              >
                <UnderlineIcon />
              </ToggleGroupItem>
            </ToggleGroup>

            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="text-sm text-ink underline"
            >
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>

          {showPreview ? (
            <div className="min-h-[20rem] w-full rounded-md border border-line px-3 py-2 text-sm leading-relaxed text-ink">
              <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
                components={mdComponents}
              >
                {content || "Nothing to preview yet."}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              rows={14}
              className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          )}
        </div>

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