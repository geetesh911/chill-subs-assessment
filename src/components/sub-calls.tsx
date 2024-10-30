"use client";

import { useState } from "react";
import { ModalOpenButtonIcon } from "./modal-open-button-icon";
import { Dialog } from "./ui/dialog";
import { Call } from "@/interfaces/call.interface";
import { CallDialogContent } from "./call-dialog-content";
import { getGenreValue } from "@/utils/call.util";
import { formatDate } from "@/utils/date.util";
import { ThemeIcon } from "./theme-icon";
import { cn } from "@/lib/utils";

interface SubCallsProps {
  calls: Call[];
}

export const SubCalls = ({ calls }: Readonly<SubCallsProps>) => {
  const [open, setOpen] = useState(false);
  const [call, setCall] = useState<Call | null>(null);

  const handleModalOpen = (call: Call) => {
    setOpen(true);
    setCall(call);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden md:flex w-full justify-between bg-gray-100 py-4 px-2">
        <div className="text-neutral-500 w-1/3">Name</div>
        <div className="text-neutral-500 w-1/3">Genre</div>
        <div className="text-neutral-500 w-1/3">Fee / Pay</div>
      </div>
      {(calls as Call[]).map((call) => {
        let title = call.title;

        if (call.title === "General call") {
          if (call.subGenre.length > 0) {
            title = `${call.subGenre[0]}${
              call.subGenre.length > 1 ? ` +${call.subGenre.length - 1}` : ""
            }`;
          } else {
            title = "General call";
          }
        }

        const feePaymentString = `$${call.fee.amount} / $${call.payment.amount.lower}+`;

        const deadline = call.readingPeriod.subWindows?.[0]?.closeDate
          ? `Deadline ${formatDate(call.readingPeriod.subWindows[0].closeDate)}`
          : "Always Open";

        return (
          <div
            key={call._id.$oid}
            className="flex w-full items-center md:block"
          >
            <div className="flex flex-1 flex-col md:flex-row w-full justify-between items-center border-b p-2">
              <div className="w-full md:w-1/3 py-2">
                <p className="capitalize">
                  <span className="font-bold ">{title}</span>
                  {call.theme?.isThemedCall && (
                    <>
                      <ThemeIcon className="inline-block ml-2" />
                      <span className="text-blue-500 ml-2">Themed</span>
                    </>
                  )}
                </p>
                <p
                  className={cn(
                    "capitalize",
                    call.status === "closed"
                      ? "text-gray-400"
                      : "text-green-600"
                  )}
                >
                  {call.status === "closed" ? call.status : deadline}
                </p>
              </div>
              <div className="w-full md:w-1/3 py-2 capitalize">
                {getGenreValue(call)}
              </div>
              <div className="w-full md:w-1/3 py-2">{feePaymentString}</div>
              <div className="w-full hidden md:block md:w-auto py-2">
                <button
                  className="bg-none border-none outline-none"
                  onClick={() => handleModalOpen(call)}
                >
                  <ModalOpenButtonIcon />
                </button>
              </div>
            </div>
            <div className="block md:hidden md:w-auto py-2">
              <button
                className="bg-none border-none outline-none"
                onClick={() => handleModalOpen(call)}
              >
                <ModalOpenButtonIcon />
              </button>
            </div>
          </div>
        );
      })}
      <Dialog
        onOpenChange={(value) => {
          setOpen(value);
          setCall(null);
        }}
        open={open}
      >
        <CallDialogContent call={call as Call} />
      </Dialog>
    </div>
  );
};
