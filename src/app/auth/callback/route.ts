import { NextResponse }
from "next/server";

import { createClient }
from "@/utils/supabase/server";

export async function GET(
  request: Request
) {

  const requestUrl =
    new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  if (code) {

    const supabase =
      await createClient();

    // Exchange auth code
    await supabase.auth.exchangeCodeForSession(
      code
    );

    // Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      return NextResponse.redirect(
        `${requestUrl.origin}/login`
      );
    }

    // CHECK BUSINESS PROFILE
    const {
      data: business,
    } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    // IF BUSINESS EXISTS
    if (business) {

      return NextResponse.redirect(
        `${requestUrl.origin}/dashboard`
      );
    }

    // NO BUSINESS FOUND
    return NextResponse.redirect(
      `${requestUrl.origin}/setup`
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login`
  );
}