import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  customProp?: string; // Add a custom property to avoid the empty interface error
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, customProp, ...props }, ref) => {
    return <input type={type} ref={ref} className={className} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
