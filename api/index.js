export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');

  try {
    const resp = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Karing',
        'Accept': '*/*',
      },
    });
    const text = await resp.text();
    res.setHeader('Content-Type', resp.headers.get('Content-Type') || 'text/plain');
    res.status(resp.status).send(text);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
