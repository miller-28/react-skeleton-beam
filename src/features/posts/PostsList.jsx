import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchService } from "../../services/fetchService";
import GeneralButton from "../../components/GeneralButton";
import { useTranslation } from "react-i18next";

export function PostsList() {

    const qc =useQueryClient();
    const { t } = useTranslation();
    const [userId, setUserId] = useState(1);

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["posts", userId],
        queryFn: () => fetchService.getJson(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&&_delay=1500`),
    });

    let posts = data ?? [];

    if (isLoading) return <p>{t('pages.posts.loading')}…</p>;
    
    if (isError) return (
        <p style={{ color: "crimson" }}>
        {t('general.error')}: {error.message} <button onClick={() => refetch()}>{t('general.retry')}</button>
        </p>
    );

    return (
        <section>
            <p>
            {isFetching ? <small>({t('pages.posts.refreshing_posts')}...)</small> : null}
            </p>
            <GeneralButton
                buttonName={t('general.show_more')}
                callback={() => {
                    setUserId((prev) => {
                        const next = prev + 1;
                        return next;
                    });
                }}
            />
            <ul>
                {posts.map(post => (
                <li key={post.id}>
                    <strong>
                        {post.title}
                    </strong> - <small>{post.body.substring(0, 35)}</small>...
                </li>
                ))}
            </ul>
        </section>
    );
}   