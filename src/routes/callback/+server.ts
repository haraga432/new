import type { RequestHandler } from '@sveltejs/kit';

const CLIENT_ID = '1394403075581808700';
const CLIENT_SECRET = 'HnR3suJa-SEM8qAg-_Psx10TXUEAxKH5';
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPE = 'identify guilds.join guilds.members.read';
const TOKEN_URL = 'https://discord.com/api/oauth2/token';
const USER_URL = 'https://discord.com/api/users/@me';
const GUILD_ID = '1344346046612115487';
const BOT_TOKEN = 'MTM5NDQwMzA3NTU4MTgwODcwMA.GkxzBE.eL7ougG05DLaqWPeRysqhvKf0QWz_3oxDZqwFc';
const ROLE_MAP: Record<string, string> = {
    '1380851604483342426': 'desync',
    '1393729205069549599': 'staff',
    '1380851610665619564': 'friend',
    '1380851611890352229': 'customer',
    '1394815351979643001': 'user',
    '1376641904132886730': 'boost'
};

export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get('code');
    if (!code) {
        return new Response('No authentication!', { status: 400 });
    }
    // Token holen
    const data = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: SCOPE
    });
    const tokenRes = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    });
    if (!tokenRes.ok) return new Response('Token Error', { status: 400 });
    const tokenJson = await tokenRes.json();
    const access_token = tokenJson['access_token'];
    // Userdaten holen
    const userRes = await fetch(USER_URL, {
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
    const userJson = await userRes.json();
    const username = `${userJson.username}#${userJson.discriminator}`;
    const user_id = userJson.id;
    const avatar = userJson.avatar;
    // Member Info holen
    const MEMBER_URL = `https://discord.com/api/guilds/${GUILD_ID}/members/${user_id}`;
    const memberRes = await fetch(MEMBER_URL, {
        headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
    });
    const memberJson = await memberRes.json();
    const user_roles = memberJson.roles || [];
    const user_ranks = user_roles.filter((rid: string) => rid in ROLE_MAP).map((rid: string) => ROLE_MAP[rid]);
    const user_rank = user_ranks.length ? user_ranks.join(', ') : 'user';
    let active_license = 'none';
    if (user_roles.includes('1394904776923152444')) active_license = 'Lifetime';
    else if (user_roles.includes('1394904752063647895')) active_license = 'Monthly';
    const now = Math.floor(Date.now() / 1000);
    const last_login = `${now}`;
    const hwid_status = memberJson.joined_at === memberJson.premium_since ? 'Unlinked' : 'Linked';
    // Cookies vorbereiten
    const cookieOptions = 'Path=/; Max-Age=86400; SameSite=Lax';
    const setCookies = [
        `discord_logged_in=1; ${cookieOptions}`,
        `user_id=${user_id}; ${cookieOptions}`,
        `username=${encodeURIComponent(username)}; ${cookieOptions}`,
        `user_rank=${encodeURIComponent(user_rank)}; ${cookieOptions}`,
        `active_license=${active_license}; ${cookieOptions}`,
        `last_login=${last_login}; ${cookieOptions}`,
        `hwid_status=${hwid_status}; ${cookieOptions}`,
        `avatar=${avatar}; ${cookieOptions}`
    ];
    // Redirect mit Cookies
    const headers = new Headers();
    headers.set('Location', 'http://localhost:5173/dashboard');
    for (const c of setCookies) headers.append('Set-Cookie', c);
    return new Response(null, {
        status: 302,
        headers
    });
};
