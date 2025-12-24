import * as React from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { cn } from "@/lib/utils";
import { Input } from "./input";

type InputWithAddonProps = React.ComponentProps<typeof Input> & {
  leftIcon?: React.ReactNode;
  rightButtonText?: string;
  onRightButtonClick?: () => void;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  className?: string;
};

export const InputWithAddon = React.forwardRef<HTMLInputElement, InputWithAddonProps>(
  (
    {
      leftIcon,
      rightButtonText,
      onRightButtonClick,
      rightIcon,
      onRightIconClick,
      className,
      ...inputProps
    },
    ref
  ) => {
    return (
      <InputGroup className={cn("w-full", className)}>
        {leftIcon ? <InputGroupAddon>{leftIcon}</InputGroupAddon> : null}
        <InputGroupInput ref={ref} {...inputProps} />
        {rightButtonText ? (
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={onRightButtonClick}>
              {rightButtonText}
            </InputGroupButton>
          </InputGroupAddon>
        ) : rightIcon ? (
          <InputGroupAddon align="inline-end">
            <button
              type="button"
              onClick={onRightIconClick}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              {rightIcon}
            </button>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    );
  }
);
InputWithAddon.displayName = "InputWithAddon";

