import { Button } from "@/components/ui/button";
import { Undo2, Trash2 } from "lucide-react";

interface ToolbarProps {
  onUndo: () => void;
  onClearAll: () => void;
  canUndo: boolean;
  canClearAll: boolean;
}

export const Toolbar = ({ 
  onUndo, 
  onClearAll,
  canUndo,
  canClearAll 
}: ToolbarProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-800 rounded-lg">
      <Button
        variant="secondary"
        size="icon"
        onClick={onUndo}
        disabled={!canUndo}
        className="w-10 h-10"
        title="Undo last annotation"
      >
        <Undo2 className="w-5 h-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onClearAll}
        disabled={!canClearAll}
        className="w-10 h-10"
        title="Clear all annotations"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
};