import { Button } from "@/components/ui/button";
import { FAILURE_TYPES, FailureType, SUCCESS_TYPE, LabelType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LabelPanelProps {
  activeLabel: LabelType;
  onLabelSelect: (label: LabelType) => void;
}

export const LabelPanel = ({ activeLabel, onLabelSelect }: LabelPanelProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      {/* Success button */}
      <div>
        <Button
          variant={activeLabel === SUCCESS_TYPE ? "default" : "secondary"}
          onClick={() => onLabelSelect(SUCCESS_TYPE)}
          className={cn(
            "w-full justify-start",
            activeLabel === SUCCESS_TYPE && "bg-green-600 hover:bg-green-700"
          )}
        >
          Success
        </Button>
      </div>

      {/* Failure types */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-white">Failure Types</h3>
        {FAILURE_TYPES.map((type) => (
          <Button
            key={type}
            variant={activeLabel === type ? "default" : "secondary"}
            onClick={() => onLabelSelect(type)}
            className={cn(
              "justify-start",
              activeLabel === type && "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {type.replace("_", " ")}
          </Button>
        ))}
      </div>
    </div>
  );
};