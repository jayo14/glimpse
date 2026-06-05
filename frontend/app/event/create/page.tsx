/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EventService } from "@/api/event";
import { AuthService } from "@/api/auth"; 

import DetailsStep from "@/components/event/DetailsStep";
import InvitesStep from "@/components/event/InvitesStep";
import SuccessStep from "@/components/event/SuccessStep";
import MetricsStep from "@/components/event/MetricsStep";

interface PhotographerInput {
  email: string;
}

interface EventFormInputs {
  title: string;
  description?: string;
  location?: string;
  guest_photo_limit?: number;
  attendees?: number;
  event_start?: string | Date | undefined;
  event_end?: string | Date | undefined;
  photographers?: PhotographerInput[];
}

type CreationSteps =
  | "PRIMARY_METRICS"
  | "ADDITIONAL_DETAILS"
  | "INVITE_PHOTOGRAPHERS"
  | "LIVE_SUCCESS";

export default function CreateEventPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState<boolean>(true);

  const [step, setStep] = useState<CreationSteps>("PRIMARY_METRICS");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [liveEventId, setLiveEventId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const methods = useForm<EventFormInputs>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      guest_photo_limit: 0,
      attendees: 0,
      event_start: undefined,
      event_end: undefined,
      photographers: [],
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const eventTitle = methods.watch("title") || "";
  const photographerFields = methods.watch("photographers") || [];

  // Fetch and check profile role on mount
  useEffect(() => {
    async function checkUserAccess() {
      try {
        const profile = await AuthService.getMe();
        setUserRole(profile?.profile?.role || "");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to authenticate user session.");
        router.push("/host-dashboard");
      } finally {
        setIsCheckingRole(false);
      }
    }
    checkUserAccess();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = async () => {
    if (step === "PRIMARY_METRICS") {
      if (eventTitle.trim()) {
        setStep("ADDITIONAL_DETAILS");
      } else {
        toast.error("Please provide a valid event title.");
      }
    } else if (step === "ADDITIONAL_DETAILS") {
      setStep("INVITE_PHOTOGRAPHERS");
    }
  };

  const onSubmit = async (data: EventFormInputs) => {
    setIsSubmitting(true);

    try {
      const eventResponse = await EventService.createEvent({
        title: data.title,
        description: data.description || undefined,
        location: data.location || undefined,
        guest_photo_limit: data.guest_photo_limit,
        attendees: data.attendees,
        event_start: data.event_start
          ? new Date(data.event_start).toISOString()
          : undefined,
        event_end: data.event_end
          ? new Date(data.event_end).toISOString()
          : undefined,
      });

      const structuralId = eventResponse?.event?.id;

      if (structuralId) {
        setLiveEventId(structuralId);

        if (selectedFile) {
          try {
            await EventService.uploadCoverImage(structuralId, selectedFile);
          } catch (uploadError: any) {
            toast.error(
              uploadError?.message || "Cover image asset upload failed.",
            );
          }
        }

        if (data.photographers && data.photographers.length > 0) {
          for (const p of data.photographers) {
            try {
              await EventService.addCollaborator(structuralId, p.email);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: any) {
              toast.error(`Failed to send invitation to ${p.email}`);
            }
          }
        }

        toast.success("Event successfully created!");
        setStep("LIVE_SUCCESS");
      } else {
        toast.error("Fail to create event");
        router.push("/host-dashboard");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to create event, internal error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Loading State while checking role
  if (isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 2. Access Restriction UI State
  if (userRole !== "HOST" && userRole !== "PHOTOGRAPHER") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground select-none">
        <div className="w-full max-w-md p-6 rounded-2xl border border-border bg-card text-center shadow-sm flex flex-col items-center gap-4">
          <div className="p-3 bg-destructive/10 rounded-full text-destructive">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Access Restricted
            </h2>
            <p className="text-sm text-muted-foreground">
              You need a <strong>Host</strong> or <strong>Photographer</strong>{" "}
              profile to build and orchestrate events.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full mt-2">
            <Button
              onClick={() => router.push("/host-dashboard")}
              className="w-full rounded-full"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/settings/profile")} // Adjust this path to where users switch roles
              className="w-full rounded-full"
            >
              Switch Profile Role
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Allowed Form Screen State
  const activeDotIndex =
    step === "PRIMARY_METRICS" ? 0 : step === "ADDITIONAL_DETAILS" ? 1 : 2;
  const isFooterVisible = step !== "LIVE_SUCCESS";

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex items-center justify-center flex-col p-4 sm:p-6 bg-background text-foreground overflow-hidden select-none relative">
        <div className="w-full max-w-md flex flex-col justify-between min-h-[85vh] relative z-20">
          <form className="w-full flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === "PRIMARY_METRICS" && (
                <MetricsStep
                  key="metrics"
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                />
              )}
              {step === "ADDITIONAL_DETAILS" && <DetailsStep key="details" />}
              {step === "INVITE_PHOTOGRAPHERS" && <InvitesStep key="invites" />}
              {step === "LIVE_SUCCESS" && (
                <SuccessStep
                  key="success"
                  title={eventTitle}
                  eventDate={(() => {
                    const startTime = methods.getValues("event_start");
                    return startTime
                      ? new Date(startTime).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "";
                  })()}
                  description={methods.getValues("description")}
                  imagePreview={imagePreview}
                  eventId={liveEventId}
                  onDone={() => router.push("/host-dashboard")}
                />
              )}
            </AnimatePresence>
          </form>

          {/* DYNAMIC NAVIGATION CONTROLS BAR */}
          {isFooterVisible && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/20">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((idx) => {
                  const isSelected = idx === activeDotIndex;
                  return (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isSelected
                          ? "w-6 bg-foreground"
                          : "w-1.5 bg-muted-foreground/30"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                {step !== "PRIMARY_METRICS" && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      setStep(
                        step === "ADDITIONAL_DETAILS"
                          ? "PRIMARY_METRICS"
                          : "ADDITIONAL_DETAILS",
                      )
                    }
                    className="h-11 rounded-full border border-border text-xs uppercase tracking-widest font-sans px-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-40"
                  >
                    Back
                  </button>
                )}

                {step !== "INVITE_PHOTOGRAPHERS" ? (
                  <Button
                    type="button"
                    size="lg"
                    disabled={step === "PRIMARY_METRICS" && !eventTitle.trim()}
                    onClick={handleNextStep}
                    className="rounded-full h-11 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center px-6 disabled:opacity-40"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    disabled={isSubmitting}
                    onClick={methods.handleSubmit(onSubmit)}
                    className="rounded-full h-11 sm:h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center px-6 font-sans disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Launching...
                      </>
                    ) : photographerFields.length > 0 ? (
                      <>
                        Send Invites & Launch{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Skip & Launch <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
