// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Office pranks. Zero evidence.</div>
        <p className="mt-4 text-body">
          Turn your workplace into a playground. Pocket Heist lets you create
          and assign sneaky little missions to your colleagues. Swap someone&apos;s
          screensaver, hide the stapler, reorganise the snack drawer. Harmless
          chaos, maximum fun.
        </p>
        <p className="mt-2 text-body">
          Track your active heists, see what&apos;s been assigned to you, and relive
          your greatest (expired) schemes, all in one place.
        </p>
      </div>
    </div>
  )
}
