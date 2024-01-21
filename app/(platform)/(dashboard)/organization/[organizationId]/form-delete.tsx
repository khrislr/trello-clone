"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function FormDelete() {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        disabled={pending}
        type="submit"
        variant={"destructive"}
        size={"sm"}
      >
        Delete
      </Button>
    </div>
  );
}
