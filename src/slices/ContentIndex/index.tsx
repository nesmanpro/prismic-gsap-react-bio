import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {

  const client = createClient();
  const BlogPosts = await client.getAllByType('blog_post');
  const projects = await client.getAllByType('project');

  const contentType = slice.primary.content_type || 'Blog'

  const items = contentType === 'Blog' ? BlogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>


      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ContentList
        items={items} contentType={contentType} viewMoreText={slice.primary.view_more_text} fallBackImageItem={slice.primary.fallback_image_item} />
    </Bounded>
  );
};

export default ContentIndex;
