import { createServer } from 'node:http';

const server = createServer((req, res) => {
    // Configuración de cabeceras CORS
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Manejo de petición pre-flight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return; // Ahora está correctamente dentro de la función
    }

    const url = new URL(req.url, `https://${req.headers.host}`);
    const pathname = url.pathname;

    // Ruta Path Params
    if (pathname.startsWith('/path/')) {
        const partes = pathname.split('/');
        const n1 = Number(partes[2]) || 0;
        const n2 = Number(partes[3]) || 0;
        res.writeHead(200, headers);
        res.end(JSON.stringify({ resultado: n1 + n2 }));
        return;
    }

    // Ruta Query Params
    if (pathname === '/query') {
        const n1 = Number(url.searchParams.get('n1')) || 0;
        const n2 = Number(url.searchParams.get('n2')) || 0;
        res.writeHead(200, headers);
        res.end(JSON.stringify({ resultado: n1 + n2 }));
        return;
    }

    // Ruta Body Params (POST)
    if (pathname === '/body' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body || '{}');
            const n1 = Number(data.n1) || 0;
            const n2 = Number(data.n2) || 0;
            res.writeHead(200, headers);
            res.end(JSON.stringify({ resultado: n1 + n2 }));
        });
        return;
    }

    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "No encontrado" }));
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});
