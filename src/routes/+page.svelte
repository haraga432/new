<script>
  import AnimatedStats from "$lib/AnimatedStats.svelte";
  import FAQAccordion from "$lib/FAQAccordion.svelte";
  import { onMount } from "svelte";

  const stats = [
    { id: "stat-users", end: 1247, duration: 1200, label: "Users" },
    { id: "stat-bans", end: 0, duration: 800, label: "Bans" },
    { id: "stat-games", end: 3, duration: 900, label: "Games" },
    { id: "stat-updates", end: 27, duration: 1000, label: "Updates" },
  ];
  const faqItems = [
    {
      question: "Wie funktioniert DESYNC?",
      answer:
        "DESYNC bietet Premium-Gaming-Lösungen mit Fokus auf Performance und Sicherheit.",
    },
    {
      question: "Wie kann ich eine Lizenz erwerben?",
      answer: 'Im Dashboard unter "Purchase" findest du alle Lizenzoptionen.',
    },
    {
      question: "Wie funktioniert der Discord-Login?",
      answer:
        'Mit einem Klick auf "login with Discord" wirst du sicher authentifiziert.',
    },
  ];

  function loginWithDiscord() {
    window.location.href =
      "https://discord.com/oauth2/authorize?client_id=1394403075581808700&redirect_uri=http://localhost:5173/callback&response_type=code&scope=identify%20guilds.join%20guilds.members.read";
  }

  /**
   * @param {string} name
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const last = parts.pop();
      if (last) return last.split(";").shift();
    }
  }

  let heroLoading = true;
  onMount(() => {
    setTimeout(() => {
      heroLoading = false;
    }, 1200); // Match navbar animation duration
  });
</script>

<main class="main-hero-wrapper">
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <span
            class="badge-text hero-loading-anim {heroLoading
              ? 'hero-loading'
              : ''}">PREMIUM GAMING</span
          >
        </div>
        <h1 class="hero-title">
          <span class="title-line">
            <span
              class="typewriter-text hero-loading-anim {heroLoading
                ? 'hero-loading'
                : ''}">DESYNC</span
            >
          </span>
          <span
            class="title-subtitle hero-loading-anim {heroLoading
              ? 'hero-loading'
              : ''}">Gaming Solutions</span
          >
        </h1>
        <p class="hero-description">
          <span class="hero-loading-anim {heroLoading ? 'hero-loading' : ''}"
            >Experience the next level of gaming with our advanced solutions.</span
          ><br />
          <span class="hero-loading-anim {heroLoading ? 'hero-loading' : ''}"
            >Optimized for performance, security, and community.</span
          >
        </p>
      </div>
    </div>
  </section>
</main>

<link rel="stylesheet" href="/style.css" />

<style>
  .main-hero-wrapper {
    flex: 1 0 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
  .hero {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 0;
    margin: 0 auto;
    flex: 1 0 auto;
  }
  .hero-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 0 auto;
    padding: 0 16px;
  }
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    margin-top: 0;
  }
  .hero-badge {
    margin-bottom: 0;
  }
  .hero-title {
    margin-bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .title-line {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .typewriter-text {
    display: inline-block;
    width: auto;
    text-align: center;
    margin: 0 auto;
  }
  .hero-description {
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }
  .hero-loading-anim {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .hero-loading {
    opacity: 0;
    transform: translateY(24px) scale(0.95);
    animation: heroFadeIn 0.7s cubic-bezier(0.4, 1.3, 0.6, 1) 0.1s forwards;
  }
  @keyframes heroFadeIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @media (max-width: 600px) {
    .main-hero-wrapper {
      padding-top: 80px;
    }
    .hero-container {
      padding: 0 6px;
    }
  }
</style>
