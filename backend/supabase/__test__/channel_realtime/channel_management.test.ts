import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { supabase_client, supabase_service_client } from "../shared/client.ts";
import { showLogs } from "../shared/constants.ts";

import { loginUser } from "../shared/setup/auth.setup.ts";
import { afterEach, beforeEach, describe, it } from "@testing-library";
import { Logger } from "#shared/service/logger.service.ts";

describe("Channel management", async () => {
  beforeEach(async () => {
    await supabase_service_client
      .from("channels")
      .delete()
      .eq("channel_name", "test_channel");
  });

  afterEach(async () => {
    await supabase_service_client
      .from("channels")
      .delete()
      .eq("channel_name", "test_channel");
  });

  it("User can create a channel, and is added to this channel upon creation.", async () => {
    const { data } = await supabase_client.auth.signInWithPassword({
      email: loginUser.email,
      password: loginUser.password,
    });
    if (showLogs) {
      if (data.user?.id) {
        Logger.info("--- USER SIGNED IN ---");
      }
    }

    const { data: channel_id, error } = await supabase_client.rpc(
      "create_channel",
      {
        channel_name: "test_channel",
        is_support: true,
        creator_id: data.user?.id,
      }
    );

    if (showLogs) {
      Logger.info("Channel created with id: ", channel_id, "error: ", error);
    }

    const { data: channels } = await supabase_client
      .from("channels")
      .select("*");
    if (showLogs) {
      Logger.info("channels", channels);
    }
    if (!channels) {
      throw new Error("No channels found");
    }
    assertEquals(channels.length, 1);
    assertEquals(channels[0].channel_name, "test_channel");
    assertEquals(channels[0].is_support, true);
    assertEquals(channels[0].channel_id, channel_id);

    const { data: channels_participants, error: cperror } =
      await supabase_client.from("channels_participants").select("*");

    if (!channels_participants) {
      throw new Error("No channels_participants found");
    }

    if (showLogs) {
      Logger.info("channels_participants", channels_participants);
      Logger.info("channels_participants_error", cperror);
    }

    assertEquals(channels_participants.length, 1);
    assertEquals(channels_participants[0].channel_id, channel_id);
    assertEquals(channels_participants[0].user_id, data.user?.id);

    await supabase_client.auth.signOut();

    await supabase_service_client
      .from("channels_participants")
      .delete()
      .throwOnError()
      .eq("channel_id", channel_id);

    const { data: existing_channels_participants } = await supabase_client
      .from("channels_participants")
      .select("*");

    assertEquals(existing_channels_participants, []);
  });
});
