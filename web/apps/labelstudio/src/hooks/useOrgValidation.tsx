import { useEffect } from "react";
import { ToastType, useToast } from "@humansignal/ui";

/**
 * Creates a shared AbortController, which can be used to abort requests.
 * Automatically cancels the current controller when the component unmounts.
 */
export const useOrgValidation = (): void => {
  const toast = useToast();

  useEffect(() => {
    if (window.APP_SETTINGS?.flags?.storage_persistence) return;
    toast.show({
      message: (
        <>
          数据将保存在运行此容器的节点上，但如果此节点消失，所有数据都将丢失。
        </>
      ),
      type: ToastType.alertError,
      duration: -1,
    });
  }, []);
};
