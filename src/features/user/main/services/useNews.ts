import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../../shared/api";
import type { INews } from "../../../../shared/interface/news.interface";

export interface INewsR {
  name: string;
  title: string;
  description: string;
  author: string;
  author_id: number;
}

interface IParams {
  author_id?: number;
  slug?: string;
}

const newsKey: string = "newsKey";

export const useNews = () => {
  const queryClient = useQueryClient();

  const getNews = (params?: IParams) =>
    useQuery<INews[], Error>({
      queryKey: [newsKey, params],
      queryFn: () => API.get("news", { params }).then((res) => res.data),
      gcTime: 1000 * 60 * 30,
      staleTime: 1000 * 60 * 15,
    });

  const createNews = useMutation<INews, Error, INewsR>({
    mutationFn: (body) => API.post("news", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [newsKey] });
    },
  });

  const deleteNews = useMutation<void, Error, number>({
    mutationFn: (id) => API.delete(`news/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [newsKey] });
    },
  });

  const updateNews = useMutation<INews, Error, { id: number; body: INewsR }>({
    mutationFn: ({ id, body }) =>
      API.patch(`news/${id}`, body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [newsKey] });
    },
  });

  return { getNews, createNews, deleteNews, updateNews };
};
