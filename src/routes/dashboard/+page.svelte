<script>
  import MediaGallery from "./MediaGallery.svelte";
  import { onMount } from "svelte";

  let tabs = [
    { id: "overview", label: "Overview" },
    { id: "downloads", label: "Downloads" },
    { id: "purchase", label: "Purchase" },
    { id: "media", label: "Media" },
  ];
  let activeTab = "overview";
  function setTab(tab) {
    activeTab = tab;
  }

  let user = {
    user_id: "",
    user_rank: "",
    active_license: "",
    last_login: "",
    hwid_status: "",
    avatar: "",
  };
  let loggedIn = true;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function logout() {
    document.cookie = "discord_logged_in=; Max-Age=0; path=/;";
    document.cookie = "user_id=; Max-Age=0; path=/;";
    document.cookie = "username=; Max-Age=0; path=/;";
    document.cookie = "user_rank=; Max-Age=0; path=/;";
    document.cookie = "active_license=; Max-Age=0; path=/;";
    document.cookie = "last_login=; Max-Age=0; path=/;";
    document.cookie = "hwid_status=; Max-Age=0; path=/;";
    document.cookie = "avatar=; Max-Age=0; path=/;";
    window.location.href = "/login";
  }

  function formatDate(ts) {
    if (!ts) return "";
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleString();
  }

  async function fetchUser() {
    try {
      const res = await fetch("/api/userinfo");
      if (!res.ok) throw new Error("Not logged in");
      const data = await res.json();
      if (data.error) {
        window.location.href = "/login";
        return;
      }
      user.user_id = data.user_id;
      user.user_rank = data.user_rank;
      user.active_license = data.active_license;
      user.last_login = data.last_login;
      user.hwid_status = data.hwid_status;
      user.avatar = data.avatar;
    } catch (e) {
      window.location.href = "/login";
    }
  }

  function wavefyTitle(title) {
    return title
      .split("")
      .map(
        (char, i) =>
          `<span class='wave-letter' style='animation-delay:${i * 0.07}s'>${char === " " ? " " : char}</span>`
      )
      .join("");
  }

  onMount(fetchUser);

  // Media section data
  let mediaEntries = [
    {
      title: "NOMAY",
      logo: "/media/nomay_logo.png",
      features: [
        "Supported Hardware: Makcu, Kmbox Net",
        "Supported Games: Valorant (Chinese), Marvel Rivals, Overwatch",
        "Undetected, safe, no injection, color aimbot, low latency, easy activation, low CPU, plug & play, auto config save",
        "Aimbot: On/Off, FOV, Aim Key, head offset, Bezier, enemy color (Yellow/Purple), multiple configs",
        "Aim Settings: Speed, FOV-X, FOV-Y, Bezier Speed",
        "Triggerbot: On/Off, Trigger Key, Delay, First Shot Delay",
        "Silentbot: On/Off, Key, Speed, Cooldown, Bezier",
        "Custom UI: Show/Hide, theme color, transparency, Dark/Classic modes, auto config save, modern & intuitive",
      ],
      media: [
        "/media/1.png",
        "/media/2.png",
        "/media/3.png",
        "/media/4.png",
        "/media/5.png",
        "/media/6.png",
      ],
    },
    // Add more media entries here as needed
  ];
</script>

<div class="background-animation">
  <div class="grid-overlay"></div>
  <div class="floating-particles"></div>
</div>
<header class="navbar">
  <div
    class="navbar-container"
    style="display: flex; align-items: center; justify-content: space-between;"
  >
    <a
      href="/"
      class="navbar-logo"
      style="display:flex;align-items:center;gap:12px;text-decoration:none;flex:0 0 auto;"
    >
      <div class="logo-container"></div>
      <span class="logo-text">DESYNC</span>
    </a>
    <nav
      class="navbar-links"
      style="flex:1; display:flex; justify-content:center; align-items:center; gap:32px;"
    >
      {#each tabs as tab}
        <a
          href="#"
          class="nav-link {activeTab === tab.id ? 'active' : ''}"
          on:click|preventDefault={() => setTab(tab.id)}>{tab.label}</a
        >
      {/each}
    </nav>
    <div style="flex:0 0 auto;display:flex;align-items:center;">
      <a href="#" class="btn-primary" on:click|preventDefault={logout}>
        <span>Logout</span>
      </a>
    </div>
  </div>
</header>
<main>
  <section class="dashboard-section">
    <div class="section-container">
      <div class="section-header"></div>
      <!-- Overview Section -->
      {#if activeTab === "overview"}
        <div id="overview" class="dashboard-content active">
          <div class="section-header">
            <h2 class="section-title">
              {@html wavefyTitle("Account Overview")}
            </h2>
            <p class="section-subtitle">
              All information about your account at a glance
            </p>
          </div>
          <div class="dashboard-userinfo">
            <div class="userinfo-card">
              <div
                class="userinfo-header announcements-header"
                style="display:flex;align-items:center;gap:16px;"
              >
                <h3 style="margin:0;">Account Information</h3>
                {#if user.avatar && user.avatar !== "null" && user.user_id}
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar}.png?size=64`}
                    alt="Profile"
                    style="width:40px;height:40px;border-radius:50%;box-shadow:0 2px 8px #ff228a44;object-fit:cover;"
                  />
                {:else if user.user_id}
                  <img
                    src={`https://cdn.discordapp.com/embed/avatars/${Number(user.user_id) % 5}.png`}
                    alt="Profile"
                    style="width:40px;height:40px;border-radius:50%;box-shadow:0 2px 8px #ff228a44;object-fit:cover;"
                  />
                {/if}
              </div>
              <div class="userinfo-row">
                <span>User ID:</span> <span>#{user.user_id}</span>
              </div>
              <div class="userinfo-row">
                <span>User Rank:</span>
                <span class=""
                  >{#if user.user_rank}{user.user_rank
                      .split(",")
                      .map(
                        (r) =>
                          r.trim().charAt(0).toUpperCase() + r.trim().slice(1)
                      )
                      .join(" & ")}{:else}none{/if}</span
                >
              </div>
              <div class="userinfo-row">
                <span>Active License:</span>
                <span class=""
                  >{#if user.active_license && user.active_license.toLowerCase() !== "none"}<span
                      class="status-badge active">{user.active_license}</span
                    >{:else}<span class="status-badge">none</span>{/if}</span
                >
              </div>
              <div class="userinfo-row">
                <span>Last Login:</span>
                <span>{formatDate(user.last_login)}</span>
              </div>
              <div class="userinfo-row">
                <span>HWID Status:</span>
                <span class="">{user.hwid_status}</span>
              </div>
            </div>
            <div class="announcements-card">
              <div class="announcements-header">
                <h3>Recent Updates</h3>
                <span class="update-badge">1 new</span>
              </div>
              <ul class="announcements-list">
                <li>
                  <strong>2025-07-16:</strong> Loader v1.0 released! Improved performance
                  and new features.
                </li>
              </ul>
            </div>
          </div>
          <div style="margin-bottom:20vh;"></div>
        </div>
      {/if}
      <!-- Downloads Section -->
      {#if activeTab === "downloads"}
        <div id="downloads" class="dashboard-content active">
          <div class="section-header">
            <h2 class="section-title">{@html wavefyTitle("Downloads")}</h2>
            <p class="section-subtitle">
              Redeem your code and download the loader
            </p>
          </div>
          <div
            class="dashboard-downloads"
            style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; justify-content: center; align-items: start;"
          >
            <!-- Redeem Box -->
            <div
              class="download-card"
              style="width:555px; height:422px; min-width:320px; min-height:320px; display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start; padding:28px 28px 24px 28px;"
            >
              <h3
                style="font-size:1.4rem; font-family:'Orbitron',sans-serif; color:#ff228a; font-weight:700; margin-bottom:10px; text-align:left; width:100%;"
              >
                Redeem
              </h3>
              <p
                style="margin: 0 0 18px 0; color: #bbbbbb; font-size: 1.01rem; font-weight: 400; text-align:left; width:100%; line-height:1.6;"
              >
                Access Desync Software by Entering Your License Key
              </p>
              <hr
                style="width:100%; border:0; border-top:1.5px solid rgba(255,255,255,0.08); margin-bottom:18px; margin-left:0;"
              />
              <form
                class="redeem-form"
                style="width:100%; display:flex; flex-direction:row; align-items:center; gap:12px; margin-bottom:0;"
              >
                <input
                  class="redeem-input"
                  type="text"
                  placeholder="Enter your redeem code"
                  style="flex:1 1 auto; min-width:0; border-radius:10px; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,34,138,0.13); color:#fff; font-size:1rem; padding:12px 16px; margin-bottom:0; box-shadow:none; outline:none; transition:border 0.2s;"
                />
                <button
                  type="submit"
                  class="btn-primary"
                  style="flex:0 0 auto; padding:12px 28px; border-radius:10px; font-size:1rem; text-align:center; display:flex; align-items:center; justify-content:center; box-shadow:none;"
                  >Redeem</button
                >
              </form>
              <style>
                @media (max-width: 600px) {
                  .redeem-form {
                    flex-direction: column !important;
                    align-items: stretch !important;
                    gap: 10px !important;
                  }
                  .redeem-form button {
                    width: 100% !important;
                  }
                }
              </style>
            </div>
            <!-- Download Loader Box -->
            <div
              class="download-card"
              style="width:555px; height:422px; min-width:320px; min-height:320px; display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start; padding:28px 28px 24px 28px;"
            >
              <h3
                style="font-size:1.4rem; font-family:'Orbitron',sans-serif; color:#ff228a; font-weight:700; margin-bottom:10px; text-align:left; width:100%;"
              >
                Download Loader
              </h3>
              <p
                style="margin: 0 0 6px 0; color: #bbbbbb; font-size: 1.01rem; font-weight: 400; text-align:left; width:100%; line-height:1.6;"
              >
                Download the Latest Desync Loader
              </p>
              <hr
                style="width:100%; border:0; border-top:1.5px solid rgba(255,255,255,0.08); margin-bottom:18px; margin-left:0;"
              />
              <div
                style="width:100%; display:flex; flex-direction:row; align-items:center; justify-content:center;"
              >
                <button
                  class="btn-primary"
                  style="min-width:100px; max-width:120px; padding:12px 0; border-radius:10px; font-size:1rem; text-align:center; display:flex; align-items:center; justify-content:center; box-shadow:none;"
                  >Download</button
                >
              </div>
            </div>
          </div>
          <div style="margin-bottom:20vh;"></div>
        </div>
      {/if}
      <!-- Purchase Section -->
      {#if activeTab === "purchase"}
        <div id="purchase" class="dashboard-content active">
          <div class="section-header">
            <h2 class="section-title">
              {@html wavefyTitle("Purchase License")}
            </h2>
            <p class="section-subtitle">
              Choose your plan and unlock premium gaming features
            </p>
          </div>
          <div class="pricing-grid">
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>Monthly</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">14.99</span>
                  <span class="period">/month</span>
                </div>
              </div>
              <ul class="pricing-features">
                <li>Full access to all DESYNC Software</li>
                <li>Regular Updates</li>
                <li>Exclusive Discord Access</li>
              </ul>
              <a href="#" class="btn-secondary">Get Monthly</a>
            </div>
            <div class="pricing-card featured">
              <div class="pricing-badge">Best Value</div>
              <div class="pricing-header">
                <h3>Lifetime</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">49.99</span>
                  <span class="period">one-time</span>
                </div>
              </div>
              <ul class="pricing-features">
                <li>Full access to all DESYNC Software</li>
                <li>Lifetime Updates</li>
                <li>Exclusive Discord Access</li>
                <li>No recurring payments</li>
              </ul>
              <a href="#" class="btn-primary">Get Lifetime</a>
            </div>
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>HWID Reset</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">4.99</span>
                  <span class="period">per reset</span>
                </div>
              </div>
              <ul class="pricing-features">
                <li>Reset your Hardware ID</li>
                <li>First time FREE</li>
                <li>
                  open a ticket with a good reason and maybe it will be accepted
                  for free.
                </li>
              </ul>
              <a href="#" class="btn-secondary">Reset HWID</a>
            </div>
          </div>
          <div style="margin-bottom:20vh;"></div>
        </div>
      {/if}
      <!-- Media Section -->
      {#if activeTab === "media"}
        <div id="media" class="dashboard-content active">
          <div class="section-header">
            <h2 class="section-title">{@html wavefyTitle("Media")}</h2>
            <p class="section-subtitle">
              Screenshots, features and more about our products
            </p>
          </div>
          <div
            class="media-list"
            style="display: flex; flex-direction: column; gap: 36px; margin-top: 32px;"
          >
            {#each mediaEntries as media}
              <div
                class="media-entry"
                style="background:rgba(255,255,255,0.02);border-radius:20px;box-shadow:0 4px 32px #ff228a18;padding:32px 20px;display:flex;flex-direction:column;gap:18px;max-width:900px;margin:0 auto;"
              >
                <!-- Title -->
                <h2
                  style="font-family:'Orbitron',sans-serif;font-size:1.5rem;background:linear-gradient(135deg,#ff228a,#ff4ecd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:900;margin-bottom:8px;text-align:left;letter-spacing:0.5px;"
                >
                  {media.title}
                </h2>
                <!-- Features -->
                <ul
                  style="margin:0 0 0 0;padding:0 0 0 18px;line-height:1.7;font-size:1.04rem;color:#e0e0e0;"
                >
                  {#each media.features as feature}
                    <li style="margin-bottom:2px;">{feature}</li>
                  {/each}
                </ul>
                <hr
                  style="border:0;border-top:1.5px solid #ff228a33;margin:18px 0 10px 0;"
                />
                <!-- Media Gallery -->
                <div style="margin-top:0;">
                  <MediaGallery galleryImages={media.media} />
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </section>
</main>

<link rel="stylesheet" href="/style.css" />

<style>
</style>
