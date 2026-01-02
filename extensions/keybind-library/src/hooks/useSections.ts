import { usePromise } from "@raycast/utils";
import { sectionsService } from "../services/sections.service";

export default function useSections() {
  const {
    data: sections = [],
    isLoading,
    revalidate,
  } = usePromise(async () => {
    return await sectionsService.getAll();
  }, []);

  return { sections, revalidate, isLoading };
}
