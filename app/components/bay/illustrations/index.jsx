// The site's illustrations: wordless vector drawings in the editor's own language.
import BannerArt from "./BannerArt";
import CaptionsArt from "./CaptionsArt";
import ChannelInfoArt from "./ChannelInfoArt";
import LogoArt from "./LogoArt";
import ThumbnailArt from "./ThumbnailArt";

export { TakeOutArt, ToolkitArt } from "./HomeArt";

const TOOL_ART = {
  thumbnail: ThumbnailArt,
  captions: CaptionsArt,
  logo: LogoArt,
  banner: BannerArt,
  channelinformation: ChannelInfoArt,
};

/** The drawing for one tool: what it takes out of YouTube and hands back. */
export function ToolArt({ toolId, className }) {
  const Art = TOOL_ART[toolId] ?? ThumbnailArt;
  return <Art className={className} />;
}
