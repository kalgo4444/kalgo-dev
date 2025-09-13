import { memo, type ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="text-xs text-red-500">{children}</p>;
};

export default memo(ErrorMessage);
