import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
const { NEXT_PUBLIC_IS_PREVIEW_SITE } = process.env;

export default function Home(props) {
  const { pageContent, recentPosts, preview } = props;

  const pageTitle = pageContent ? pageContent.title : "Home";

  const pageDescription = pageContent
    ? pageContent.description
    : "Welcome to the Next.js Contentful blog starter";

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageTitle}
          description={pageDescription}
          url={Config.pageMeta.home.url}
        />

        {pageContent && pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          {pageContent && pageContent.body && (
            <PageContentWrapper>
              <RichTextPageContent richTextBodyField={pageContent.body} />
            </PageContentWrapper>
          )}
          <RecentPostList posts={recentPosts} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const previewData = NEXT_PUBLIC_IS_PREVIEW_SITE || preview;
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
    {
      preview: previewData,
    },
  );

  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      preview,
      pageContent: pageContent || null,
      recentPosts,
    },
  };
}
