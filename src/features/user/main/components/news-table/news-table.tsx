import { memo, type FC } from "react";
import type { INews } from "../../../../../shared/interface/news.interface";
import { useDispatch } from "react-redux";
import { setEditingItem } from "../../store/newsSlice";
import { useNavigate } from "react-router-dom";
import { useNews } from "../../services/useNews";
import { toast } from "sonner";

interface NewsTableProps {
  news: INews[] | undefined;
}

const NewsTable: FC<NewsTableProps> = ({ news }) => {
  const dis = useDispatch();
  const nav = useNavigate();
  const { deleteNews } = useNews();

  const handleDelete = (id: number): void => {
    deleteNews.mutate(id, {
      onSuccess: () => {
        toast.success("News is deleted");
      },
    });
  };

  const handleUpdate = (item: INews): void => {
    dis(setEditingItem(item));
    nav("create-news");
  };
  return (
    <>
      <div className="w-full bg-white dark:bg-gray-800 shadow rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 h-16">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Author
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {news?.map((item: INews) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 h-16"
              >
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                  {item.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                  {item.author}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="btn px-1 py-0.5"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn px-1 py-0.5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default memo(NewsTable);
