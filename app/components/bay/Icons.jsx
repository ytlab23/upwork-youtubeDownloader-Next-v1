// Every icon on the site comes from one drawn set, Phosphor (phosphoricons.com).
// Per-icon imports from the server-safe build keep the bundle to the icons used
// and let server and client components share them.
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { ClosedCaptioningIcon } from "@phosphor-icons/react/dist/ssr/ClosedCaptioning";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { FilmStripIcon } from "@phosphor-icons/react/dist/ssr/FilmStrip";
import { IdentificationCardIcon } from "@phosphor-icons/react/dist/ssr/IdentificationCard";
import { ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import { PanoramaIcon } from "@phosphor-icons/react/dist/ssr/Panorama";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr/UserCircle";
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr/WarningCircle";

const decorative = { "aria-hidden": true, focusable: "false" };

/** What each tool hands back: a picture, closed captions, a profile picture, wide channel art, an ID card of details. */
const TOOL_ICONS = {
  thumbnail: ImageIcon,
  captions: ClosedCaptioningIcon,
  logo: UserCircleIcon,
  banner: PanoramaIcon,
  channelinformation: IdentificationCardIcon,
};

export function ToolIcon({ toolId, size = 18, weight = "duotone", ...props }) {
  const Icon = TOOL_ICONS[toolId] ?? ImageIcon;
  return <Icon size={size} weight={weight} {...decorative} {...props} />;
}

export const IconDownload = ({ size = 18, weight = "bold", ...props }) => (
  <DownloadSimpleIcon size={size} weight={weight} {...decorative} {...props} />
);

export const IconAlert = ({ size = 24, weight = "regular", ...props }) => (
  <WarningCircleIcon size={size} weight={weight} {...decorative} {...props} />
);

export const IconChevron = ({ size = 20, weight = "regular", ...props }) => (
  <CaretDownIcon size={size} weight={weight} {...decorative} {...props} />
);

export const IconArrowLeft = ({ size = 18, weight = "bold", ...props }) => (
  <ArrowLeftIcon size={size} weight={weight} {...decorative} {...props} />
);

export const IconArrowRight = ({ size = 16, weight = "bold", ...props }) => (
  <ArrowRightIcon size={size} weight={weight} {...decorative} {...props} />
);

export const IconFilm = ({ size = 18, weight = "regular", ...props }) => (
  <FilmStripIcon size={size} weight={weight} {...decorative} {...props} />
);

/** The wordmark's symbol: a download arrow on a playhead-vermilion tile. */
export const Mark = ({ className = "size-7" }) => (
  <span className={`flex shrink-0 items-center justify-center rounded-[5px] bg-bay-playhead text-bay-ink ${className}`} aria-hidden="true">
    <DownloadSimpleIcon size={17} weight="bold" />
  </span>
);
