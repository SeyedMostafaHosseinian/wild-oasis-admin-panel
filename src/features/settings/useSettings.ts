import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { SettingsInterface } from "../../types/setttings.interface";

export function useSettings() {
  const { data: settings, isLoading } = useQuery<SettingsInterface>({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settings, isLoading };
}
