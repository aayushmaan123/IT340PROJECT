import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Send2FARequest {
  userId: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, email }: Send2FARequest = await req.json();
    
    console.log("Generating 2FA code for user:", userId, "email:", email);

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Delete any existing unused codes for this user
    await supabase
      .from("twofa_codes")
      .delete()
      .eq("user_id", userId)
      .eq("used", false);

    // Insert new code
    const { error: insertError } = await supabase
      .from("twofa_codes")
      .insert({
        user_id: userId,
        code: code,
        expires_at: expiresAt.toISOString(),
        used: false,
      });

    if (insertError) {
      console.error("Error inserting 2FA code:", insertError);
      throw new Error("Failed to create verification code");
    }

    // Send email with Resend API
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SoleVerse <onboarding@resend.dev>",
        to: [email],
        subject: "Your Verification Code",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #000; color: #fff;">
            <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px; color: #fff;">Verify Your Email</h1>
            <p style="font-size: 16px; color: #888; margin-bottom: 32px;">Enter this code to complete your signup:</p>
            <div style="background: #111; border: 1px solid #333; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 32px;">
              <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #fff;">${code}</span>
            </div>
            <p style="font-size: 14px; color: #666;">This code expires in 5 minutes.</p>
            <p style="font-size: 14px; color: #666; margin-top: 32px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent:", emailData);

    if (!emailResponse.ok) {
      console.error("Email send failed:", emailData);
      throw new Error("Failed to send verification email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-2fa-code function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
