import { cookies } from "next/headers";

const perks = [
  "Member-only downloads",
  "Access to paid scripts",
  "Order history",
  "Announcements & updates",
  "Discord support access",
  "Private dashboard tools",
];

const downloads = [
  { name: "Loader v1.2", status: "Available" },
  { name: "Premium Config Pack", status: "Available" },
  { name: "Redeem Key Manager", status: "Locked" },
];

const discordInvite = "https://discord.gg/mkZDXTEq";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const memberName = cookieStore.get("member_name")?.value || "Member";

  return (
    <main className="min-h-screen bg-[#0f1012] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-semibold">Nameless Members Portal</div>
            <div className="text-sm text-zinc-400">
              Logged in as {memberName}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#features"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Features
            </a>
            <a
              href="#dashboard"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Dashboard
            </a>
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
            >
              Join Discord
            </a>

            <form action="/api/member-logout" method="POST">
              <button
                type="submit"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
            Paid Members Only
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Your private Discord member dashboard.
          </h1>

          <p className="mt-4 max-w-xl text-zinc-400">
            Welcome {memberName}. Your member key worked, and you now have access
            to your private dashboard, downloads, updates, and tools.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#dashboard"
              className="rounded-md bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Open Dashboard
            </a>
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/10 px-5 py-3 text-sm text-white"
            >
              Join Discord
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Member Status</div>
              <div className="text-sm text-zinc-400">
                Dashboard access granted
              </div>
            </div>
            <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
              Active
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
              <div className="text-2xl font-bold">Gold</div>
              <div className="text-sm text-zinc-400">Member Tier</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-zinc-400">Downloads</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-zinc-400">Orders</div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="mb-2 text-sm font-medium text-zinc-300">
              Latest Announcement
            </div>
            <div className="text-sm text-zinc-400">
              New premium loader update is now available for active members.
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Member Features</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Everything your paid members can access from one place.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk}
              className="rounded-xl border border-white/10 bg-[#17181c] p-5"
            >
              <div className="text-base font-medium">{perk}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="mt-2 text-sm text-zinc-400">
            This is your members area after a successful key login.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-[#17181c] p-4">
            <div className="mb-4 border-b border-white/10 pb-4">
              <div className="text-lg font-semibold">Member Menu</div>
              <div className="text-sm text-zinc-400">Private navigation</div>
            </div>

            <nav className="space-y-2 text-sm">
              <div className="rounded-md bg-white/5 px-3 py-2">Overview</div>
              <div className="rounded-md px-3 py-2 text-zinc-400">
                Downloads
              </div>
              <div className="rounded-md px-3 py-2 text-zinc-400">Orders</div>
              <div className="rounded-md px-3 py-2 text-zinc-400">Keys</div>
              <div className="rounded-md px-3 py-2 text-zinc-400">Account</div>
            </nav>
          </aside>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">Downloads</div>
                  <div className="text-sm text-zinc-400">
                    Available member resources
                  </div>
                </div>
                <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black">
                  Download All
                </button>
              </div>

              <div className="space-y-3">
                {downloads.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#101114] p-4"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-zinc-400">
                        {item.status}
                      </div>
                    </div>

                    <button
                      className={`rounded-md px-4 py-2 text-sm ${
                        item.status === "Available"
                          ? "bg-white text-black"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {item.status === "Available" ? "Download" : "Locked"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
              <div className="text-xl font-semibold">Account Overview</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
                  <div className="text-sm text-zinc-400">
                    Discord Username
                  </div>
                  <div className="mt-1 text-lg font-semibold">{memberName}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
                  <div className="text-sm text-zinc-400">Membership</div>
                  <div className="mt-1 text-lg font-semibold">
                    Premium Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}