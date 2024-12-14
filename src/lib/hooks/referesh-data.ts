"use client";

import { useRouter } from "next/navigation";

export function useRefreshData() {
  const router = useRouter();

  const refresh = () => {
    router.refresh();
  };

  return refresh;
}
