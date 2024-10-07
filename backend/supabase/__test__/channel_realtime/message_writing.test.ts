import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { supabase_client, supabase_service_client } from "../shared/client.ts";
import { showLogs } from "../shared/constants.ts";
import { loginUser, otherUser } from "../shared/setup/auth.setup.ts";
import { describe, it } from "@testing-library";
import { Logger } from "#shared/service/logger.service.ts";

describe("Message sending", async () => {
  it("User can send a message to a channel where he is a participant", async () => {
    await supabase_service_client
      .from("channels")
      .delete()
      .eq("channel_name", "test_channel");
    const { data } = await supabase_client.auth.signInWithPassword({
      email: loginUser.email,
      password: loginUser.password,
    });
    if (showLogs) {
      if (data.user?.id) {
        Logger.info("--- USER SIGNED IN ---");
      }
    }

    const { data: channel_id } = await supabase_client.rpc("create_channel", {
      channel_name: "test_channel",
      is_support: true,
      creator_id: data.user?.id,
    });

    if (showLogs) {
      Logger.info("Channel created with id: ", channel_id);
    }

    const { data: message_id } = await supabase_client.rpc("send_message", {
      channel_id: channel_id,
      message_text: "Hello, this is a test message",
      user_id: data.user?.id,
    });

    if (showLogs) {
      Logger.info("Message sent with id: ", message_id);
    }

    if (showLogs) {
      Logger.info("🛀 cleaning up... 🛀");
    }

    await supabase_service_client
      .from("channels")
      .delete()
      .match({ channel_id: channel_id });

    await supabase_service_client
      .from("messages")
      .delete()
      .eq("message_id", message_id);
    const { data: remainingMessages } = await supabase_client
      .from("messages")
      .select("*")
      .eq("message_id", message_id);
    const { data: remainingChannels } = await supabase_client
      .from("channels")
      .select("*")
      .eq("channel_id", channel_id);
    assertEquals(remainingMessages, []);
    assertEquals(remainingChannels, []);
    if (showLogs) {
      Logger.info("✅ Cleaned up! ✅");
    }
  });

  it("User cannot send a message to a channel where he is not a participant", async () => {
    const { data } = await supabase_client.auth.signInWithPassword({
      email: loginUser.email,
      password: loginUser.password,
    });
    if (showLogs) {
      if (data.user?.id) {
        Logger.info("--- USER SIGNED IN ---");
      }
    }

    const { data: channel_id } = await supabase_client.rpc("create_channel", {
      channel_name: "test_channel",
      is_support: true,
      creator_id: data.user?.id,
    });

    if (showLogs) {
      Logger.info("Channel created with id: ", channel_id);
    }

    await supabase_client.auth.signOut();
    await supabase_client.auth.signInWithPassword({
      email: otherUser.email,
      password: otherUser.password,
    });

    const { error } = await supabase_client.rpc("send_message", {
      channel_id: channel_id,
      message_text: "Hello, this is a test message",
      user_id: data.user?.id,
    });

    if (showLogs) {
      Logger.info("Error: ", error);
    }

    assertEquals(
      error?.message,
      'new row violates row-level security policy for table "messages"'
    );

    if (showLogs) {
      Logger.info("🛀 cleaning up... 🛀");
    }

    await supabase_service_client
      .from("channels")
      .delete()
      .throwOnError()
      .ilike("channel_name", "test_channel");

    if (showLogs) {
      Logger.info("✅ Cleaned up! ✅");
    }
  });
});
