"use client"

import CalloutItem from "@/components/callout-item"

export default function FAQsPage() {
  return (
    <main className="w-full">
      <div className="flex flex-col items-center py-12">
        <CalloutItem
          title="Non trovi ciò che stai cercando?"
          href="/guides"
          buttonText="Esplora le Guide"
          className="max-w-4xl"
        />

      </div>
    </main>
  )
}
