const GITHUB_OWNER = 'irfanmln';
const GITHUB_REPO = 'tk-annahl-website';
const BRANCH = 'main';
const MANIFEST_PATH = 'assets/galeri/manifest.json';

async function ghRequest(path, method = 'GET', body = null) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const opts = {
    method,
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'annahl-admin'
    }
  };
  if (body) opts.body = JSON.stringify({ ...body, branch: BRANCH });
  const res = await fetch(url, opts);
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${res.status}: ${text}`);
  }
  return res.json();
}

async function getManifest() {
  const data = await ghRequest(MANIFEST_PATH);
  if (!data) return { photos: [], sha: null };
  const content = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8');
  return { ...JSON.parse(content), sha: data.sha };
}

async function saveManifest(photos, sha) {
  const content = Buffer.from(JSON.stringify({ photos }, null, 2)).toString('base64');
  const body = {
    message: 'chore: update galeri manifest',
    content,
    branch: BRANCH
  };
  if (sha) body.sha = sha;
  await ghRequest(MANIFEST_PATH, 'PUT', body);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    if (req.method === 'GET') {
      const manifest = await getManifest();
      const { sha, ...data } = manifest;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { category, filename, content, caption } = req.body || {};
      if (!category || !filename || !content) {
        return res.status(400).json({ error: 'Missing fields' });
      }
      const filePath = `assets/galeri/${category}/${filename}`;
      await ghRequest(filePath, 'PUT', {
        message: `feat: tambah foto galeri ${category}/${filename}`,
        content
      });
      const manifest = await getManifest();
      manifest.photos.unshift({
        category,
        filename,
        caption: caption || '',
        uploaded_at: new Date().toISOString()
      });
      await saveManifest(manifest.photos, manifest.sha);
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { category, filename } = req.body || {};
      if (!category || !filename) {
        return res.status(400).json({ error: 'Missing fields' });
      }
      const filePath = `assets/galeri/${category}/${filename}`;
      const fileData = await ghRequest(filePath);
      if (!fileData) return res.status(404).json({ error: 'File not found' });
      await ghRequest(filePath, 'DELETE', {
        message: `chore: hapus foto galeri ${category}/${filename}`,
        sha: fileData.sha
      });
      const manifest = await getManifest();
      manifest.photos = manifest.photos.filter(
        p => !(p.category === category && p.filename === filename)
      );
      await saveManifest(manifest.photos, manifest.sha);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[galeri api]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
