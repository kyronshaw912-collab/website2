"use client";

import { useEffect, useState } from "react";

const KEY_DATABASE: Record<
  string,
  {
    key: string;
    status: string;
    expiresAt: string;
    lastUsedAt: string;
    hwidLocked: boolean;
    hwid: string | null;
    hwidResetCount: number;
  }
> = {
  "NAMELESS-123": {
    key: "NAMELESS-123",
    status: "active",
    expiresAt: "2026-04-30",
    lastUsedAt: "Never",
    hwidLocked: false,
    hwid: null,
    hwidResetCount: 1,
  },
  "G8D9-VFQ8-KKUH-JPE4": {
    key: "G8D9-VFQ8-KKUH-JPE4",
    status: "active",
    expiresAt: "2026-04-30",
    lastUsedAt: "Never",
    hwidLocked: false,
    hwid: null,
    hwidResetCount: 1,
  },
  "2LYY-6VPY-DN3C-Q4WQ": {
    key: "2LYY-6VPY-DN3C-Q4WQ",
    status: "active",
    expiresAt: "2026-04-30",
    lastUsedAt: "Never",
    hwidLocked: false,
    hwid: null,
    hwidResetCount: 1,
  },
};

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

const scriptText =
  'loadstring(game:HttpGet("https://raw.githubusercontent.com/kyronshaw912-collab/script-lua/main/PhantomScript.txt"))()';

type KeyData = {
  key: string;
  status: string;
  expiresAt: string;
  lastUsedAt: string;
  hwidLocked: boolean;
  hwid: string | null;
  hwidResetCount: number;
};

export default function Home() {
  const [memberKey, setMemberKey] = useState("");
  const [discordUser, setDiscordUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "downloads" | "orders" | "keys" | "account"
  >("overview");
  const [keyData, setKeyData] = useState<KeyData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("discordUser");
    const savedLoggedIn = localStorage.getItem("loggedIn");
    const savedKey = localStorage.getItem("memberKey");

    if (savedUser) setDiscordUser(savedUser);
    if (savedKey) {
      setMemberKey(savedKey);
      const found = KEY_DATABASE[savedKey.trim()];
      if (found) setKeyData(found);
    }
    if (savedLoggedIn === "true") setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    const trimmedKey = memberKey.trim();
    const found = KEY_DATABASE[trimmedKey];

    if (!found) {
      setLoggedIn(false);
      setError("Invalid member key.");
      return;
    }

    setLoggedIn(true);
    setError("");
    setKeyData(found);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("memberKey", trimmedKey);
    localStorage.setItem("discordUser", discordUser || "Member");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMemberKey("");
    setDiscordUser("");
    setKeyData(null);
    setActiveTab("overview");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("memberKey");
    localStorage.removeItem("discordUser");
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptText);
      alert("Script copied!");
    } catch {
      alert("Could not copy script.");
    }
  };

  const handleDownloadScript = () => {
    const blob = new Blob([scriptText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PhantomScript.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopyKey = async () => {
    if (!keyData?.key) return;

    try {
      await navigator.clipboard.writeText(keyData.key);
      alert("Key copied!");
    } catch {
      alert("Could not copy key.");
    }
  };

  const handleResetHWID = () => {
    if (!keyData) return;

    if (keyData.hwidResetCount <= 0) {
      alert("No resets left.");
      return;
    }

    const updated = {
      ...keyData,
      hwid: null,
      hwidLocked: false,
      hwidResetCount: keyData.hwidResetCount - 1,
    };

    setKeyData(updated);
    KEY_DATABASE[keyData.key] = updated;
    alert("HWID reset successful!");
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold">Downloads</div>
            <div className="text-sm text-zinc-400">
              Available member resources
            </div>
          </div>
          <button
            onClick={handleDownloadScript}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
          >
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
                <div className="text-sm text-zinc-400">{item.status}</div>
              </div>

              {item.status === "Available" ? (
                item.name === "Loader v1.2" ? (
                  <button
                    onClick={handleDownloadScript}
                    className="rounded-md bg-white px-4 py-2 text-sm text-black"
                  >
                    Download
                  </button>
                ) : (
                  <button
                    onClick={handleCopyScript}
                    className="rounded-md bg-white px-4 py-2 text-sm text-black"
                  >
                    Copy Script
                  </button>
                )
              ) : (
                <button className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-zinc-400">
                  Locked
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
        <div className="text-xl font-semibold">Script Access</div>
        <div className="mt-4 rounded-xl border border-white/10 bg-[#101114] p-4">
          <div className="mb-3 text-sm text-zinc-400">
            Copy or download your loader below.
          </div>

          <textarea
            readOnly
            value={scriptText}
            className="min-h-[120px] w-full rounded-md border border-white/10 bg-black p-3 text-sm text-white outline-none"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopyScript}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
            >
              Copy Script
            </button>
            <button
              onClick={handleDownloadScript}
              className="rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-white"
            >
              Download Script
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
        <div className="text-xl font-semibold">Account Overview</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">Discord Username</div>
            <div className="mt-1 text-lg font-semibold">
              {discordUser || "Member"}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">Membership</div>
            <div className="mt-1 text-lg font-semibold">Premium Active</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDownloads = () => (
    <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Downloads</div>
          <div className="text-sm text-zinc-400">
            Available member resources
          </div>
        </div>
        <button
          onClick={handleDownloadScript}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
        >
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
              <div className="text-sm text-zinc-400">{item.status}</div>
            </div>

            {item.status === "Available" ? (
              item.name === "Loader v1.2" ? (
                <button
                  onClick={handleDownloadScript}
                  className="rounded-md bg-white px-4 py-2 text-sm text-black"
                >
                  Download
                </button>
              ) : (
                <button
                  onClick={handleCopyScript}
                  className="rounded-md bg-white px-4 py-2 text-sm text-black"
                >
                  Copy Script
                </button>
              )
            ) : (
              <button className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-zinc-400">
                Locked
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
      <div className="text-xl font-semibold">Orders</div>
      <div className="mt-4 rounded-xl border border-white/10 bg-[#101114] p-4 text-zinc-400">
        No order history available yet.
      </div>
    </div>
  );

  const renderKeys = () => (
    <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
      <div className="mb-4 text-xl font-semibold">Keys</div>

      {!keyData && (
        <div className="rounded-xl border border-white/10 bg-[#101114] p-4 text-zinc-400">
          No key data found for this key.
        </div>
      )}

      {keyData && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">Current Key</div>
            <div className="mt-1 break-all text-lg font-semibold">
              {keyData.key}
            </div>
            <button
              onClick={handleCopyKey}
              className="mt-3 rounded-md bg-white px-4 py-2 text-sm text-black"
            >
              Copy Key
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">Key Status</div>
            <div
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm ${
                keyData.status === "active"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : keyData.status === "expired"
                  ? "bg-yellow-500/15 text-yellow-300"
                  : "bg-red-500/15 text-red-300"
              }`}
            >
              {keyData.status}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">Expiry Date</div>
            <div className="mt-1 text-lg font-semibold">
              {keyData.expiresAt}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">Last Used</div>
            <div className="mt-1 text-lg font-semibold">
              {keyData.lastUsedAt}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">HWID Lock</div>
            <div className="mt-1 text-lg font-semibold">
              {keyData.hwidLocked ? "Locked" : "Not Locked"}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
            <div className="text-sm text-zinc-400">HWID Reset</div>
            <div className="mt-1 text-lg font-semibold">
              {keyData.hwidResetCount} resets left
            </div>
            <button
              onClick={handleResetHWID}
              className="mt-3 rounded-md border border-white/10 px-4 py-2 text-sm text-white"
            >
              Reset HWID
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAccount = () => (
    <div className="rounded-2xl border border-white/10 bg-[#17181c] p-5">
      <div className="text-xl font-semibold">Account</div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
          <div className="text-sm text-zinc-400">Discord Username</div>
          <div className="mt-1 text-lg font-semibold">
            {discordUser || "Member"}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#101114] p-4">
          <div className="text-sm text-zinc-400">Current Key</div>
          <div className="mt-1 break-all text-lg font-semibold">
            {memberKey || "No key"}
          </div>
        </div>
      </div>
    </div>
  );

  if (loggedIn) {
    return (
      <main className="min-h-screen bg-[#0f1012] text-white">
        <header className="border-b border-white/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <div className="text-lg font-semibold">Nameless Members Portal</div>
              <div className="text-sm text-zinc-400">
                Logged in as {discordUser || "Member"}
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
              <button
                onClick={handleLogout}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Log Out
              </button>
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
              Welcome {discordUser || "Member"}. Your member key worked, and you
              now have access to your private dashboard, downloads, updates, and
              tools.
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
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full rounded-md px-3 py-2 text-left ${
                    activeTab === "overview"
                      ? "bg-white/5 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab("downloads")}
                  className={`w-full rounded-md px-3 py-2 text-left ${
                    activeTab === "downloads"
                      ? "bg-white/5 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  Downloads
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full rounded-md px-3 py-2 text-left ${
                    activeTab === "orders"
                      ? "bg-white/5 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  Orders
                </button>

                <button
                  onClick={() => setActiveTab("keys")}
                  className={`w-full rounded-md px-3 py-2 text-left ${
                    activeTab === "keys"
                      ? "bg-white/5 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  Keys
                </button>

                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full rounded-md px-3 py-2 text-left ${
                    activeTab === "account"
                      ? "bg-white/5 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  Account
                </button>
              </nav>
            </aside>

            <div className="space-y-6">
              {activeTab === "overview" && renderOverview()}
              {activeTab === "downloads" && renderDownloads()}
              {activeTab === "orders" && renderOrders()}
              {activeTab === "keys" && renderKeys()}
              {activeTab === "account" && renderAccount()}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1012] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-lg font-semibold">Nameless Members Portal</div>
            <div className="text-sm text-zinc-400">
              Private dashboard for paid members
            </div>
          </div>

          <a
            href={discordInvite}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
          >
            Join Discord
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
            Key Access Login
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Enter your member key.
          </h1>

          <p className="mt-4 max-w-xl text-zinc-400">
            Paid members can enter their access key below to unlock the private
            dashboard, downloads, announcements, and member tools.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#17181c] p-6 shadow-2xl">
          <div className="mb-4">
            <div className="text-2xl font-semibold">Member Login</div>
            <div className="mt-1 text-sm text-zinc-400">
              Enter your key to access your dashboard
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Discord Username (optional)
              </label>
              <input
                value={discordUser}
                onChange={(e) => setDiscordUser(e.target.value)}
                placeholder="ExampleUser#0001"
                className="w-full rounded-md border border-white/10 bg-[#101114] px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Member Key
              </label>
              <input
                value={memberKey}
                onChange={(e) => setMemberKey(e.target.value)}
                placeholder="Enter your access key"
                className="w-full rounded-md border border-white/10 bg-[#101114] px-4 py-3 text-white outline-none"
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-500/15 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full rounded-md bg-white px-4 py-3 text-sm font-medium text-black"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}