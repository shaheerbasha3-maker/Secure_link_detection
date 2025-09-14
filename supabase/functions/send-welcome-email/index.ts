import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  fullName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName }: WelcomeEmailRequest = await req.json();

    console.log("Sending welcome email to:", email);

    const emailResponse = await resend.emails.send({
      from: "SecureLink <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Welcome to SecureLink - Your Account is Ready!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to SecureLink</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 12px; margin-bottom: 30px;">
            <div style="background: white; width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="#667eea" stroke-width="2" fill="none"/>
                <path d="M9 12L11 14L15 10" stroke="#667eea" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to SecureLink!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Your security platform is ready</p>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="color: #333; margin-top: 0;">🎉 Congratulations${fullName ? `, ${fullName}` : ''}!</h2>
            <p style="margin-bottom: 20px;">Your SecureLink account has been successfully created. You now have access to our comprehensive threat intelligence platform.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">🚀 What you can do now:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Analyze URLs for security threats</li>
                <li>Scan documents and files for malware</li>
                <li>Access real-time threat intelligence</li>
                <li>Monitor your security dashboard</li>
              </ul>
            </div>
          </div>

          <div style="background: #e3f2fd; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
            <h3 style="color: #1976d2; margin-top: 0;">🔐 Your Security Features</h3>
            <div style="display: grid; gap: 15px;">
              <div style="background: white; padding: 15px; border-radius: 8px;">
                <strong>✅ URL Threat Analysis</strong>
                <p style="margin: 5px 0 0 0; color: #666;">Advanced scanning for malicious links and websites</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 8px;">
                <strong>✅ Document Security</strong>
                <p style="margin: 5px 0 0 0; color: #666;">Comprehensive file and document analysis</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 8px;">
                <strong>✅ Real-time Protection</strong>
                <p style="margin: 5px 0 0 0; color: #666;">24/7 monitoring and threat intelligence</p>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get('SUPABASE_URL')?.replace('//', '//').replace('supabase.co', 'lovable.app') || 'https://your-app.lovable.app'}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Access Your Dashboard
            </a>
          </div>

          <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 30px;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              Welcome to the future of web security.<br>
              <strong>SecureLink Team</strong>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
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