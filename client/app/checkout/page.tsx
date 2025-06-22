"use client";

import { useAuthStore } from "@/store/auth_store";
import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

const CheckOutPage = () => {
  const { isAuthenticated } = useAuthStore();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      redirect("/?login=true");
    }
  }, [isAuthenticated]);

  //TODO: Add a skeleton loader or spinner while checking authentication
  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <div>CheckOutPage</div>;
};

export default CheckOutPage;
