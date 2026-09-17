"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 font-mono text-[11px] text-brass">
      {message}
    </p>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error ?? "Couldn't send that message.");
        return;
      }

      toast.success("Message sent.", {
        description: "I'll get back to you shortly.",
      });
      reset();
    } catch {
      toast.error("Network error.", {
        description: "Check your connection and try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — hidden from humans and from assistive tech. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            Name
          </label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="email" className="label mb-2 block">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@company.com"
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="label mb-2 block">
          Subject <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <Input
          id="subject"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="Role, collaboration, or question"
          {...register("subject")}
        />
        <FieldError id="subject-error" message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block">
          Message
        </label>
        <Textarea
          id="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="What are you working on?"
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <Button type="submit" variant="solid" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
        {!isSubmitting && <Send />}
      </Button>
    </form>
  );
}
