import { memo, type Dispatch, type FC, type SetStateAction } from "react";

interface AcceptUpdateProps {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

const AcceptUpdate: FC<AcceptUpdateProps> = ({ update, setUpdate }) => {
  return (
    <>
      {!update && (
        <div className={`${update ? "hidden" : "block"}`}>
          <button
            onClick={() => setUpdate(true)}
            className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1"
          >
            Update my data
          </button>
          <div className="w-full z-10 h-full absolute bg-neutral-400/70 blur-xs rounded-2xl gridCenter"></div>
        </div>
      )}
    </>
  );
};

export default memo(AcceptUpdate);
