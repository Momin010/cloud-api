export default async function handler(req: any, res: any) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let file;
    if (req.method === 'GET') {
        file = req.query.file;
    } else if (req.method === 'POST') {
        file = req.body?.file;
    }

    if (!file) {
        return res.status(400).json({ error: 'Missing file parameter' });
    }

    const url = `https://raw.githubusercontent.com/Momin010/cloud-api/master/xsd_files/${file}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'File not found' });
        }
        const data = await response.text();
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}