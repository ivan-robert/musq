import { sendNotifications } from "#functions/notifications/send/sendNotification.ts";
import { getEnvVariable } from "#functions/environment.ts";
import { createFollowNotification } from "#functions/notifications/follow_user/createNotification.ts";

Deno.serve(async (req) => {
  const payload = await req.json();
  const token = req.headers.get("Authorization");
  if (token !== `Bearer ${getEnvVariable("SUPABASE_SERVICE_ROLE_KEY")}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(req.url);
  const task = url.searchParams.get("task");
  if (task === "send") {
    return await sendNotifications(payload.record);
  }
  if (task === "follow") {
    return await createFollowNotification(payload);
  }
  return new Response("No corresponding task found", { status: 404 });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/notifications' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
