import { memo } from "react";
import { useParams } from "react-router-dom";
import { useNews } from "../../user/main/services/useNews";

const NewsPage = () => {
  const { slug } = useParams();
  const { getNews } = useNews();
  const { data } = getNews({ slug });
  console.log(data);
  return (
    <section className="my-5 min-h-[75vh] border">
      <h2>NewsPage</h2>
    </section>
  );
};

export default memo(NewsPage);
