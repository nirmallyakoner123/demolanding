import Image from "next/image";

interface ContentBlock {
  type: string;
  content?: string;
  level?: number;
  src?: string;
  alt?: string;
  items?: string[];
  ordered?: boolean;
  language?: string;
}

interface ArticleContentProps {
  content: any[];
}

export default function ArticleContent({ content }: ArticleContentProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      // Handle paragraph blocks - both 'p' (from API) and 'paragraph' (legacy)
      case "p":
      case "paragraph":
        return (
          <p
            key={index}
            className="font-nunito text-font-base leading-[1.8] text-text mb-6"
            dangerouslySetInnerHTML={{ __html: block.content || "" }}
          />
        );

      // Handle h1 blocks from API
      case "h1":
        return (
          <h1
            key={index}
            className="font-lexend text-3xl sm:text-4xl font-bold text-text mt-4 mb-6 leading-tight"
          >
            {block.content}
          </h1>
        );

      // Handle h2 blocks from API
      case "h2":
        return (
          <h2
            key={index}
            className="font-lexend text-2xl sm:text-3xl font-bold text-text mt-10 mb-4 leading-tight"
          >
            {block.content}
          </h2>
        );

      // Handle h3 blocks from API
      case "h3":
        return (
          <h3
            key={index}
            className="font-lexend text-xl sm:text-2xl font-bold text-text mt-8 mb-4 leading-tight"
          >
            {block.content}
          </h3>
        );

      // Legacy heading type with level property
      case "heading":
        const level = block.level || 2;
        const headingSizes: Record<number, string> = {
          2: "text-2xl sm:text-3xl",
          3: "text-xl sm:text-2xl",
          4: "text-lg sm:text-xl",
        };
        const HeadingTag = `h${level}` as
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6";

        return (
          <HeadingTag
            key={index}
            className={`font-lexend ${headingSizes[level] || "text-2xl"} font-bold text-text mt-10 mb-4 leading-tight`}
          >
            {block.content}
          </HeadingTag>
        );

      case "image":
        return (
          <div key={index} className="my-8 rounded-lg overflow-hidden">
            <Image
              src={block.src || "/article-not-found.png"}
              alt={block.alt || "Article image"}
              width={1200}
              height={675}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            {block.alt && (
              <p className="text-center text-sm text-text-light mt-2 italic">
                {block.alt}
              </p>
            )}
          </div>
        );

      case "list":
        const ListTag = block.ordered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`font-nunito text-font-base leading-[1.8] text-text mb-6 ${
              block.ordered ? "list-decimal" : "list-disc"
            } list-inside space-y-2`}
          >
            {block.items?.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListTag>
        );

      case "code":
        return (
          <pre
            key={index}
            className="bg-custom text-text p-6 rounded-lg overflow-x-auto mb-6 font-mono text-sm"
          >
            <code>{block.content}</code>
          </pre>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-6 py-2 my-6 italic text-lg text-text-light font-nunito"
          >
            {block.content}
          </blockquote>
        );

      default:
        // Fallback for unknown types - render as paragraph
        return (
          <p
            key={index}
            className="font-nunito text-font-base leading-[1.8] text-text mb-6"
          >
            {block.content}
          </p>
        );
    }
  };

  return (
    <div className="article-content">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
