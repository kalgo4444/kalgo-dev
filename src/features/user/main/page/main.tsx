import { memo } from "react";
import NewsTable from "../components/news-table/news-table";
import { useNews } from "../services/useNews";
import { useUser } from "../../profile/services/useUser";

const UserMainPage = () => {
  const { getUser } = useUser();
  const user = getUser();
  const { getNews } = useNews();
  const { data } = getNews({ author_id: user?.id });
  return (
    <section className="my-5">
      <div className="container">
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-1">
          <NewsTable news={data} />
        </div>
      </div>
    </section>
  );
};

export default memo(UserMainPage);
