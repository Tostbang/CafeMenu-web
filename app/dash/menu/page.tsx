import { Suspense } from "react";
import ClientPreview from "./ClientPreview";

export default function PreviewPage() {
  return (
    <Suspense>
      <ClientPreview />
    </Suspense>
  );
}
