import { memo, type FC } from "react";
import type { INews } from "../../../../shared/interface/news.interface";
import CardLoading from "../card-loading/card-loading";
import { useNavigate } from "react-router-dom";

interface NewsProps {
  news: INews[] | undefined;
  isPending: boolean;
}

const News: FC<NewsProps> = (props) => {
  const { news, isPending } = props;
  const nav = useNavigate();
  const handleClick = (slug: string | undefined): void => {
    nav(`/news/${slug}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 cursor-pointer">
      {isPending && <CardLoading />}
      {news?.map((item: INews) => (
        <div
          onClick={() => handleClick(item.slug)}
          key={item.id}
          className="p-5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl"
        >
          <div className="w-full h-[200px] bg-neutral-200 rounded-2xl animate-pulse grid place-items-center">
            Image not found
          </div>
          <div className="px-5 py-2">
            <h2
              className="text-lg font-semibold line-clamp-1"
              title={item.title}
            >
              {item.title}
            </h2>
            <p className="line-clamp-2 text-sm" title={item.description}>
              {item.description}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="size-10 rounded-full text-2xl uppercase bg-blue-500 text-white flex items-center justify-center">
              {item.author.slice(0, 1)}
            </div>
            <b>{item.author}</b>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(News);
