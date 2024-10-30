import React from "react";

interface CallDialogRowProps {
  title: string;
  value: React.ReactNode;
}

export const CallDialogRow = ({
  title,
  value,
}: Readonly<CallDialogRowProps>) => {
  return (
    <div className="py-3 bg-white border-t border-zinc-100 justify-start items-center gap-4 flex">
      <div className="w-40 text-zinc-900 text-base font-medium font-['Inter'] leading-none">
        {title}
      </div>
      <div className="justify-start items-center gap-1 flex flex-1 capitalize">
        <div className={"text-zinc-600 text-base font-normal font-['Inter'] leading-none"}>
          {value}
        </div>
      </div>
    </div>
  );
};
