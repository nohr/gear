import React, { createContext, ReactNode, useRef } from "react";

export const VRMContext = createContext<VRMProps>({
  vrm: null,
});

export function VRMProvider({ children }: { children: ReactNode }) {
  const vrm = useRef<VRMProps>(null);
  return (
    <VRMContext.Provider
      value={{
        vrm,
      }}
    >
      {children}
    </VRMContext.Provider>
  );
}
