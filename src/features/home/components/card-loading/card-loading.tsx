import { memo } from "react";

const CardLoading = () => {
  return (
    <>
      {Array.from({ length: 12 })
        .fill("")
        .map((_, inx: number) => (
          <div key={inx} className="bg-neutral-100 rounded-2xl p-5">
            <div className="w-full h-[200px] animate-pulse bg-neutral-300 rounded-2xl"></div>
            <div className="w-full h-5 bg-neutral-300 animate-pulse rounded-2xl my-2"></div>
            <div className="w-3/4 h-5 bg-neutral-300 animate-pulse rounded-2xl my-2"></div>
            <div className="w-2/5 h-5 bg-neutral-300 animate-pulse rounded-2xl my-2"></div>
          </div>
        ))}
    </>
  );
};

export default memo(CardLoading);
