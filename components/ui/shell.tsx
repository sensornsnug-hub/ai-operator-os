import { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return <div className="container-shell">{children}</div>;
}
