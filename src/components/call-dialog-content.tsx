import { Call } from "@/interfaces/call.interface";
import { CallDialogRow } from "./call-dialog-row";
import { DialogContent } from "./ui/dialog";
import {
  getFormattedPeriod,
  getGenreValue,
  getStatusString,
} from "@/utils/call.util";
import { ThemeIcon } from "./theme-icon";

interface CallDialogContentProps {
  call: Call;
}

export const CallDialogContent = ({
  call,
}: Readonly<CallDialogContentProps>) => {
  return (
    <DialogContent className="bg-white px-8 md:px-16 py-8 max-w-[95vw] md:max-w-[720px] max-h-[90vh] overflow-auto shadow justify-center items-center gap-1.5">
      <div className="pt-20 pb-16 bg-white rounded-lg flex-col justify-start items-center gap-4 inline-flex">
        <div className="self-stretch text-center text-neutral-900 text-2xl font-normal font-['Inter'] leading-7">
          Readers Write
        </div>
        <div className="justify-start items-center gap-1.5 inline-flex">
          <div className="text-zinc-500 text-sm font-normal font-['Inter'] leading-tight">
            Call by
          </div>
          <div className="text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
            The Sun
          </div>
        </div>
        <div className="h-9 px-4 bg-white rounded-full shadow justify-center items-center gap-1.5 inline-flex">
          <div className="text-zinc-900 text-sm font-semibold font-['Inter'] leading-tight">
            Guidelines
          </div>
        </div>
      </div>
      {call && (
        <div className="flex-col justify-start items-start inline-flex">
          <CallDialogRow title="Status" value={getStatusString(call)} />
          <CallDialogRow
            title="Reading periods"
            value={getFormattedPeriod(call.readingPeriod) || "-"}
          />
          <CallDialogRow
            title="Theme"
            value={
              call.theme.title ? (
                <>
                  <ThemeIcon className="inline-block" />
                  <span className={"text-blue-500 ml-2"}>
                    {call.theme.title}
                  </span>
                </>
              ) : (
                "-"
              )
            }
          />
          <CallDialogRow title="Fee" value={`$${call.fee.amount}`} />
          <CallDialogRow title="Pay" value={`$${call.payment.amount.lower}+`} />
          <CallDialogRow title="Genre" value={getGenreValue(call)} />
          <CallDialogRow title="Style" value={call.genreStyle} />
          <CallDialogRow
            title="Subgenres"
            value={call.subGenre.length > 0 ? call.subGenre.join(", ") : "-"}
          />
          <CallDialogRow
            title="Word count"
            value={
              call.length?.minimumWordCount
                ? `${call.length.minimumWordCount} - ${call.length.maximumWordCount}`
                : "-"
            }
          />
        </div>
      )}
      <div className="py-10 justify-start items-start gap-4 inline-flex">
        <div className="grow shrink basis-0 text-zinc-700 text-base font-normal font-['Inter'] leading-normal">
          Send us your essay that’s too personal for any other journal—the one
          where you’re so unguarded you need editors you can trust and
          compassionate readers who will honor your vulnerability.
          <br />
          Share a clear-eyed reflection on your big mistakes, a joyful
          celebration of your hard-won victories, or a testament that makes a
          newsworthy event feel intimate instead of faceless.
          <br />
          We’re looking for essays that seek to understand the world from a
          fresh perspective and that wrestle with questions that resist easy
          answers.
        </div>
      </div>
    </DialogContent>
  );
};
