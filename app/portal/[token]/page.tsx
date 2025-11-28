import { NextRequest } from "next/server";
import CandidatePortal from "./portal-client";

export default async function Page({ params }: { params: { token: string } }) {
  // This is a server component that renders the client component
  return <CandidatePortal token={params.token} />;
}
