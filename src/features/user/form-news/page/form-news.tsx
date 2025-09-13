import { memo } from "react";
import NewsForm from "../components/news-form/news-form";

const FormNews = () => {
  return (
    <section className="my-5">
      <div className="container">
        <div className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-1">
          <h2 className="text-2xl font-semibold text-center">Create News</h2>
          <NewsForm />
        </div>
      </div>
    </section>
  );
};

export default memo(FormNews);
