import React from "react";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import TopNavBar from "@/components/shared/TopNavBar";

async function RootHomePage() {
  // const su = await getServerSession();

  return <> UUU{/* <pre variant="bordered">{JSON.stringify(su)}</pre> */}</>;
}

export default RootHomePage;
