/**
 * Emits a JSON-LD <script>. Server component — the payload is serialized at
 * build time and never ships as client JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
