export async function GET() {
  return Response.json({
    "accountAssociation": {
      "header": "eyJmaWQiOjM0MTAxMywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFDM2E4OUVBOWRBNTY3ZTg2RTk3RkVlODE1YjkwYjgwNGRkMmZjNTUifQ",
      "payload": "eyJkb21haW4iOiJycHMtYW5pbWUtZmluYWwudmVyY2VsLmFwcCJ9",
      "signature": "MAUIgT/9Rc/UPUDuYbJwBO/TOp4nJ9PldIBlcISTT4lxARQ0Pp9mnRY6peeLNAu46Fk8X0LahA2mLwThzz41bhw="
    },
    "frame": {
      "version": "1",
      "name": "RPS Anime Final",
      "iconUrl": "https://rps-anime-final.vercel.app/icon.png",
      "homeUrl": "https://rps-anime-final.vercel.app",
      "imageUrl": "https://rps-anime-final.vercel.app/image.png",
      "buttonTitle": "Play Game",
      "splashImageUrl": "https://rps-anime-final.vercel.app/splash.png",
      "splashBackgroundColor": "#000000",
      "webhookUrl": "https://rps-anime-final.vercel.app/api/webhook"
    }
  });
}