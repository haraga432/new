<script>
  import { onMount } from "svelte";
  let navbarLoading = true;
  let footerLoading = true;
  onMount(() => {
    setTimeout(() => {
      navbarLoading = false;
      footerLoading = false;
    }, 1200); // 1.2s loading animation
  });
</script>

<div class="background-animation">
  <div class="grid-overlay"></div>
</div>

<div class="layout-root">
  <header class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <div class="logo-container">
          <img
            src="/logo.png"
            alt="Desync Logo"
            class="logo-image {navbarLoading ? 'navbar-loading' : ''}"
          />
          <div class="logo-glow"></div>
        </div>
        <a href="/" class="logo-text {navbarLoading ? 'navbar-loading' : ''}">
          DESYNC
        </a>
      </div>
      <nav class="navbar-links">
        <a
          href="/dashboard"
          class="nav-link {navbarLoading ? 'navbar-loading' : ''}"
        >
          Dashboard
        </a>
      </nav>
    </div>
  </header>

  <div class="layout-content">
    <slot />
  </div>

  <footer class="footer">
    <div
      class="footer-structured-container {footerLoading
        ? 'footer-loading'
        : ''}"
    >
      <div class="footer-col footer-col-left">
        <div class="footer-logo-group">
          <img src="/logo.png" alt="Desync Logo" class="footer-logo-img" />
          <div class="footer-desync-texts">
            <span class="footer-desync-title">Premium Gaming Solutions</span>
            <span class="footer-desync-desc"
              >Experience the next level of gaming with our advanced solutions</span
            >
          </div>
        </div>
      </div>
      <div class="footer-col footer-col-center">
        <div class="footer-links-group">
          <div class="footer-legal">
            <a href="#" class="footer-link">Terms of Service</a>
            <a href="#" class="footer-link">Privacy Policy</a>
            <a href="#" class="footer-link">Refund Policy</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-note {footerLoading ? 'footer-loading' : ''}">
      © 2025 desync.top All rights reserved.
    </div>
  </footer>
</div>

<style>
  html,
  body,
  #svelte {
    height: 100%;
  }
  body {
    min-height: 100vh;
  }
  .layout-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .layout-content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }
  .footer {
    width: 100%;
    background: rgba(10, 10, 15, 0.97);
    border-top: 1px solid rgba(255, 34, 138, 0.12);
    margin-top: 0;
    padding: 0;
    flex-shrink: 0;
  }
  .footer-structured-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 24px 12px 24px;
    gap: 24px;
  }
  .footer-col {
    display: flex;
    align-items: flex-start;
    min-width: 0;
  }
  .footer-col-left {
    flex: 1 1 320px;
    justify-content: flex-start;
  }
  .footer-col-center {
    flex: 2 1 600px;
    justify-content: flex-end;
  }
  .footer-links-group {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
  }
  .footer-legal {
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-items: center;
    justify-content: flex-end;
  }
  .footer-quicklinks {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    justify-content: flex-end;
  }
  .footer-logo-group {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .footer-logo-img {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    box-shadow: 0 2px 8px #ff228a22;
  }
  .footer-desync-texts {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .footer-desync-title {
    font-family: "Orbitron", sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ff228a;
    letter-spacing: 0.5px;
  }
  .footer-desync-desc {
    font-size: 0.95rem;
    color: #aaa;
    font-weight: 400;
    opacity: 0.85;
  }
  .footer-link,
  .footer-quicklink,
  .nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    position: relative;
    transition:
      color 0.2s,
      opacity 0.2s;
    padding: 4px 8px;
    border-radius: 4px;
    opacity: 0.9;
    background: none;
    outline: none;
  }
  .footer-link:hover,
  .footer-quicklink:hover,
  .nav-link:hover {
    color: #ff228a;
    opacity: 1;
    background: rgba(255, 34, 138, 0.1);
  }
  .footer-link::after,
  .footer-quicklink::after,
  .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff228a, #ff4ecd);
    transition: width 0.3s;
  }
  .footer-link:hover::after,
  .footer-quicklink:hover::after,
  .nav-link:hover::after {
    width: 100%;
  }
  .footer-note {
    text-align: center;
    font-size: 0.92rem;
    color: #888;
    padding: 12px 0;
    opacity: 0.85;
  }
  .footer-loading {
    opacity: 0;
    transform: translateY(24px) scale(0.95);
    animation: footerFadeIn 0.7s cubic-bezier(0.4, 1.3, 0.6, 1) 0.1s forwards;
  }
  @keyframes footerFadeIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @media (max-width: 900px) {
    .footer-structured-container {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 20px 16px 12px 16px;
    }
    .footer-col {
      justify-content: flex-start !important;
      margin-bottom: 8px;
    }
    .footer-col-center {
      justify-content: flex-start;
      margin-bottom: 0;
      width: 100%;
    }
    .footer-links-group {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
    }
    .footer-legal {
      justify-content: flex-start;
      gap: 16px;
    }
    .footer-quicklinks {
      justify-content: flex-start;
      gap: 16px;
    }
  }
</style>
