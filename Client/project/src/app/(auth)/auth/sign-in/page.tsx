import SigninForm from "@/components/forms/SignIn";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import React, { useEffect } from "react";

export default function SignInPage() {
  return <SigninForm />;
}
