import { memo } from "react";
import { useNews } from "../../user/main/services/useNews";
import News from "../components/news/news";

const Home = () => {
  const { getNews } = useNews();
  const { data: news, isPending } = getNews();
  return (
    <section className="my-5 min-h-[75vh]">
      <News news={news} isPending={isPending} />
    </section>
  );
};

export default memo(Home);
