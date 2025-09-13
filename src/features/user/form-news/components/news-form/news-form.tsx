import { memo, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../../../../../shared/components/error-message/error-message";
import { useUser } from "../../../profile/services/useUser";
import { useNews, type INewsR } from "../../../main/services/useNews";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../../app/stote";
import { removeEditingItem } from "../../../main/store/newsSlice";
import { toast } from "sonner";

const schema = yup
  .object({
    name: yup.string().required().min(3),
    title: yup.string().required(),
    description: yup.string().required(),
    author: yup.string().required(),
    author_id: yup.number().positive().required(),
  })
  .required();

const NewsForm = () => {
  const { getUser } = useUser();
  const user = getUser();
  const { createNews, updateNews } = useNews();
  const dis = useDispatch();
  const { editingItem } = useSelector((state: RootState) => state.news);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: INewsR) => {
    const body = {
      name: data.name,
      title: data.title,
      slug: data.title.split(" ").join("-").toLocaleLowerCase(),
      description: data.description,
      author: data.author,
      author_id: data.author_id,
    };
    if (editingItem) {
      updateNews.mutate(
        { id: editingItem.id, body: body },
        {
          onSuccess: (res) => {
            console.log(res);
            reset();
            dis(removeEditingItem());
            toast.success("News is Updated");
          },
        }
      );
    } else {
      createNews.mutate(body, {
        onSuccess: () => {
          reset();
          toast.success("News is Created");
        },
      });
    }
  };

  useEffect(() => {
    if (editingItem) {
      setValue("name", editingItem.name);
      setValue("title", editingItem.title);
      setValue("description", editingItem.description);
      setValue("author", editingItem.author);
      setValue("author_id", editingItem.author_id);
    }
  }, [editingItem]);

  useEffect(() => {
    if (user) {
      setValue("author", user.username);
      setValue("author_id", user.id);
    }
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-5 my-4"
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2  flex flex-col gap-4">
          <div>
            <label>Name</label>
            <input
              placeholder="Name"
              className="h-12 w-full indent-3"
              {...register("name")}
            />
            {errors.title && (
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label>Title</label>
            <input
              placeholder="Title"
              className="h-12 w-full indent-3"
              {...register("title")}
            />
            {errors.title && (
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div>
            <label>Description</label>
            <textarea
              placeholder="Description"
              className="w-full h-[200px] indent-3"
              {...register("description")}
            />
            {errors.title && (
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="btn h-12 max-w-lg w-full mx-auto">
        Submit
      </button>
    </form>
  );
};

export default memo(NewsForm);
