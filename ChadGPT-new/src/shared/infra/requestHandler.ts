import {
  FunctionInvokeOptions,
  FunctionsResponse,
} from "@supabase/functions-js";
import { Logger } from "#shared/service/logger.service";
import { SupabaseClient } from "@supabase/supabase-js";

export const callEdgeFunction = async <T>(
  supabaseClient: SupabaseClient,
  name: string,
  options?: FunctionInvokeOptions
): Promise<FunctionsResponse<T>> => {
  const yo = await supabaseClient.functions.invoke(name, {
    ...options,
  });
  if (yo.error) {
    Logger.error(JSON.stringify(yo.error));
    // throw yo.error;
  }

  return yo;
};
