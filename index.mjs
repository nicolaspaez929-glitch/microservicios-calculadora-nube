import { createServer } from 'node:http';

const server = createServer((req, res) => {
    // 1. CONFIGURACIÓN DE CORS
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Responder a la petición pre-flight de CORS
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return; // Ahora este return está correctamente dentro de la función del servidor
    }

    const url = new URL(req.url, `https://${req.headers.host}`);
    const pathname = url.pathname;

    // 2. RUTA PARA PATH PARAMS
    if (pathname.startsWith('/path/')) {
        const partes = pathname.split('/');
        const n1 = Number(partes[2]) || 0;
        const n2 = Number(partes[3]) || 0;
        res.writeHead(200, headers);
        res.end(JSON.stringify({ resultado: n1 + n2, metodo: "Path Params" }));
        return;
    }

    // 3. RUTA PARA QUERY PARAMS
    if (pathname === '/query') {
        const n1 = Number(url.searchParams.get('n1')) || 0;
        const n2 = Number(url.searchParams.get('n2')) || 0;
        res.writeHead(200, headers);
        res.end(JSON.stringify({ resultado: n1 + n2, metodo: "Query Params" }));
        return;
    }

    // 4. RUTA PARA BODY PARAMS (POST)
    if (pathname === '/body' && req.method === 'POST') {
        let cuerpo = '';
        req.on('data', chunk => { cuerpo += chunk; });
        req.on('end', () => {
            try {
                const datos = JSON.parse(cuerpo);
                const n1 = Number(datos.n1) || 0;
                const n2 = Number(datos.n2) || 0;
                res.writeHead(200, headers);
                res.end(JSON.stringify({ resultado: n1 + n2, metodo: "Body Params" }));
            } catch (e) {
                res.writeHead(400, headers);
                res.end(JSON.stringify({ error: "JSON no válido" }));
            }
        });
        return;
    }

    // Si no coincide ninguna ruta
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`Servidor listo en el puerto ${PORT}`);
});
