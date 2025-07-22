<script>
// Noch keine Logik, nur statisches Layout
</script>

<div class="background-animation">
    <div class="grid-overlay"></div>
    <div class="floating-particles"></div>
</div>

<header class="navbar">
    <div class="navbar-container">
        <a href="/" class="navbar-logo" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
            <span class="logo-text">DESYNC</span>
        </a>
        <nav class="navbar-links">
            <a href="/" class="nav-link">Home</a>
        </nav>
    </div>
</header>

<main class="login-main">
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h1 class="login-title">Sign In</h1>
                <p class="login-subtitle">Sign in with Discord to elevate your gaming experience.</p>
            </div>
            <div class="login-actions">
                <a href="https://discord.com/oauth2/authorize?client_id=1394403075581808700&redirect_uri=http://localhost:5173/callback&response_type=code&scope=identify%20guilds.join%20guilds.members.read" class="btn-primary btn-login">
                    <span>Sign in with Discord</span>
                </a>
            </div>
            <div class="login-footer">
                <p>By signing in, you agree to our <button type="button">Terms of Service</button> and <button type="button">Privacy Policy</button></p>
            </div>
        </div>
    </div>
</main>

<link rel="stylesheet" href="/style.css" /> 