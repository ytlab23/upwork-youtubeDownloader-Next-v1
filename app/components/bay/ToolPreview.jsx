// The home tool index shows each tool's own illustration, the same drawing its page carries.
import { ToolArt } from "./illustrations";

export default function ToolPreview({ tool }) {
  return (
    <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[3px] bg-bay-bg px-3 py-2.5">
      <ToolArt toolId={tool.id} className="block h-full w-auto max-w-full" />
    </div>
  );
}
