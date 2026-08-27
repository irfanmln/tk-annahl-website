const SUPABASE_URL = 'https://ssfiywjmgiogixryssbx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Xo3_edCbQl5okm56MkuiLQ_JRWyYwea';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { username, passwordHash } = req.body || {};
  if (!username || !passwordHash) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/admin_users?username=eq.${encodeURIComponent(username)}&password_hash=eq.${passwordHash}&select=id`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const data = await r.json();
    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json({ token: process.env.ADMIN_KEY });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
