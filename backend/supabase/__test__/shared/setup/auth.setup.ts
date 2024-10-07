import { Logger } from "#shared/service/logger.service.ts";
import { supabase_service_client } from "../client.ts";

export const loginUser = {
  email: "golem.debois@gmail.com",
  password: "password",
};

export const otherUser = {
  email: "arbre.depierre@gmail.com",
  password: "password",
};

export const setup_auth = async () => {
  Logger.info("--- SETTING UP AUTH ---");
  Logger.info("\n");
  await supabase_service_client.auth.admin.createUser({
    email: loginUser.email,
    password: loginUser.password,
    email_confirm: true,
  });
  await supabase_service_client.auth.admin.createUser({
    email: otherUser.email,
    password: otherUser.password,
    email_confirm: true,
  });
  Logger.info("--- AUTH SET UP COMPLETE ---");
  Logger.info("\n\n");
};

export const get_user_id = async (email: string) => {
  const { data } = await supabase_service_client.auth.signInWithPassword({
    email: email,
    password: loginUser.password,
  });
  if (!data || !data.user) {
    throw new Error("User not found with email: " + email);
  }
  return data.user.id;
};
