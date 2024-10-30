import { Call } from "@/interfaces/call.interface";

export function getNearestWindow(
  subWindows: Call["readingPeriod"]["subWindows"]
): Call["readingPeriod"]["subWindows"][number] | null {
  const now = new Date();
  let nearestWindow: Call["readingPeriod"]["subWindows"][number] | null = null;
  let minDiff = Infinity;

  for (const window of subWindows) {
    const openDate = window.openDate ? new Date(window.openDate) : null;
    const closeDate = window.closeDate ? new Date(window.closeDate) : null;

    if (openDate && openDate > now) {
      const diff = openDate.getTime() - now.getTime();
      if (diff < minDiff) {
        minDiff = diff;
        nearestWindow = window;
      }
    } else if (closeDate && closeDate > now) {
      const diff = closeDate.getTime() - now.getTime();
      if (diff < minDiff) {
        minDiff = diff;
        nearestWindow = window;
      }
    }
  }

  return nearestWindow;
}

export function getFormattedPeriod(data: Call["readingPeriod"]): string | null {
  const { callPeriod, subWindows } = data;

  if (callPeriod.recurring || callPeriod.limited) {
    const nearestWindow = getNearestWindow(subWindows);
    
    if (nearestWindow) {
      const openDate = nearestWindow.openDate
        ? new Date(nearestWindow.openDate)
        : null;
      const closeDate = nearestWindow.closeDate
        ? new Date(nearestWindow.closeDate)
        : null;
      const openDay = openDate ? openDate.getUTCDate() : null;
      const closeDay = closeDate ? closeDate.getUTCDate() : null;

      if (openDay !== null) {
        return `Every month (${openDay}–${closeDay})`;
      } else {
        return `Every month (until ${closeDay})`;
      }
    }
  }

  return null;
}

export function getGenreValue(call: Call) {
  return `${Object.keys(call.genre)
    .filter((key) => call.genre[key as keyof typeof call.genre])
    .join(", ")}${
    call.genreStyle !== "general" ? ` (${call.genreStyle})` : ""
  }`;
}

export function getStatusString(call: Call): string {
  const { callPeriod, subWindows } = call.readingPeriod;
  const now = new Date();

  const status = call.status
    ? call.status.charAt(0).toUpperCase() + call.status.slice(1)
    : "-";

  if (callPeriod.recurring || callPeriod.limited) {
    const nearestWindow = getNearestWindow(subWindows);
    if (nearestWindow) {
      const openDate = nearestWindow.openDate
        ? new Date(nearestWindow.openDate)
        : null;
      const closeDate = nearestWindow.closeDate
        ? new Date(nearestWindow.closeDate)
        : null;

      if (openDate && openDate > now) {
        const daysUntilOpen = Math.ceil(
          (openDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        return `${status} · Opens in ${daysUntilOpen} days`;
      } else if (closeDate && closeDate > now) {
        const daysUntilClose = Math.ceil(
          (closeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        return `${status} · Closes in ${daysUntilClose} days`;
      }
    }
  }

  return status;
}
