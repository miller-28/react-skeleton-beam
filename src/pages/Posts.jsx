import { useTranslation } from "react-i18next";
import { PostsList } from "../features/posts/PostsList";

export default function Posts() {

  const { t } = useTranslation();

  return (
    <>
      <p>
        <h2>{t('pages.posts.title')}</h2>
        <PostsList />
      </p>
    </>
  );
}