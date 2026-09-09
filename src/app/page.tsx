import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export').
// Visitors landing on `/` are sent to the English homepage — the site default.
// On Cloudflare Workers the request is handled before static assets are served.
export default function RootPage() {
  redirect('/en');
}