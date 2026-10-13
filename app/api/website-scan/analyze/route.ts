import { NextRequest } from "next/server";
import { emptyAnswers, type ScanAnswers } from "@/lib/scan";
import {
  analyzeSite,
  assertSafeUrl,
  findCachedScan,
  rateLimited,
  saveScan,
} from "@/lib/scan-server";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => ({}));
  const answers: ScanAnswers = { ...emptyAnswers, ...raw };
  const honeypot = typeof raw?.company_url === "string" ? raw.company_url : "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      const quickSteps = () => {
        for (let i = 0; i < 6; i++) send({ type: "step", step: i });
      };
      try {
        if (honeypot) {
          send({ type: "error", message: "Er ging iets mis." });
          return;
        }

        if (answers.geenWebsite) {
          quickSteps();
          const id = await saveScan({ answers, report: null, ip, status: "done" });
          send({ type: "done", id });
          return;
        }

        // SSRF + geldige URL
        let target: string;
        try {
          target = assertSafeUrl(answers.url).toString();
        } catch {
          send({
            type: "error",
            message: "We konden je website niet goed bekijken.",
          });
          return;
        }

        if (await rateLimited(ip)) {
          send({
            type: "error",
            message:
              "Je hebt het maximum aantal scans voor vandaag bereikt. Plan een gesprek, dan kijk ik er zelf naar.",
          });
          return;
        }

        const cached = await findCachedScan(target, answers);
        if (cached) {
          quickSteps();
          send({ type: "done", id: cached });
          return;
        }

        const report = await analyzeSite(answers, (step) =>
          send({ type: "step", step })
        );
        const id = await saveScan({ answers, report, ip, status: "done" });
        send({ type: "done", id });
      } catch (e) {
        console.error("[website-scan] analyse mislukt:", e);
        try {
          await saveScan({
            answers,
            report: null,
            ip,
            status: "failed",
            error: String(e).slice(0, 500),
          });
        } catch {
          /* negeren */
        }
        send({
          type: "error",
          message: "We konden je website niet goed bekijken.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
