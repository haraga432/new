import type { RequestHandler } from '@sveltejs/kit';

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

export const GET: RequestHandler = async ({ cookies }) => {
    if (!cookies.get('discord_logged_in')) {
        return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
    }
    const user_id = cookies.get('user_id');
    const username = cookies.get('username');
    const avatar = cookies.get('avatar');
    if (!user_id) {
        return new Response(JSON.stringify({ error: 'No user data' }), { status: 400 });
    }
    // Fetch latest member info from Discord
    const MEMBER_URL = `https://discord.com/api/guilds/${GUILD_ID}/members/${user_id}`;
    const memberRes = await fetch(MEMBER_URL, {
        headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
    });
    if (!memberRes.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch Discord member info' }), { status: 500 });
    }
    const memberJson = await memberRes.json();
    const user_roles = memberJson.roles || [];
    const user_ranks = user_roles.filter((rid: string) => rid in ROLE_MAP).map((rid: string) => ROLE_MAP[rid]);
    const user_rank = user_ranks.length ? user_ranks.join(', ') : 'user';
    let active_license = 'none';
    if (user_roles.includes('1394904776923152444')) active_license = 'Lifetime';
    else if (user_roles.includes('1394904752063647895')) active_license = 'Monthly';
    const now = Math.floor(Date.now() / 1000);
    const last_login = cookies.get('last_login') || `${now}`;
    const hwid_status = memberJson.joined_at === memberJson.premium_since ? 'Unlinked' : 'Linked';
    // Update cookies with fresh data
    const cookieOptions = 'Path=/; Max-Age=86400; SameSite=Lax';
    cookies.set('user_rank', encodeURIComponent(user_rank), { path: '/', maxAge: 86400, sameSite: 'lax' });
    cookies.set('active_license', active_license, { path: '/', maxAge: 86400, sameSite: 'lax' });
    cookies.set('last_login', last_login, { path: '/', maxAge: 86400, sameSite: 'lax' });
    cookies.set('hwid_status', hwid_status, { path: '/', maxAge: 86400, sameSite: 'lax' });
    // Return fresh data
    return new Response(JSON.stringify({
        user_id,
        username,
        user_rank,
        active_license,
        last_login,
        hwid_status,
        avatar
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}; 