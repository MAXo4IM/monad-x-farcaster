export async function GET() {
    return new Response(
      JSON.stringify({
        version: "vNext",
        image: "https://monad-x-farcaster-968w.vercel.app/thumbnail.png",
        buttons: [
          {
            label: "Follow Halfin",
            action: "post"
          }
        ],
        post_url: "https://monad-x-farcaster-968w.vercel.app/api/frame"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  