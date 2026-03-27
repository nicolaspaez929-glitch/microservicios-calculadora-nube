import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. BLOQUE PATH PARAMETERS (/operacion/n1/n2) ---
app.get('/path/sumar/:n1/:n2', (req, res) => {
    const resultado = parseFloat(req.params.n1) + parseFloat(req.params.n2);
    res.json({ metodo: "Path", operacion: "suma", resultado });
});
app.get('/path/restar/:n1/:n2', (req, res) => {
    const resultado = parseFloat(req.params.n1) - parseFloat(req.params.n2);
    res.json({ metodo: "Path", operacion: "resta", resultado });
});
app.get('/path/multiplicar/:n1/:n2', (req, res) => {
    const resultado = parseFloat(req.params.n1) * parseFloat(req.params.n2);
    res.json({ metodo: "Path", operacion: "multiplicación", resultado });
});
app.get('/path/dividir/:n1/:n2', (req, res) => {
    const resultado = parseFloat(req.params.n1) / parseFloat(req.params.n2);
    res.json({ metodo: "Path", operacion: "división", resultado });
});

// --- 2. BLOQUE QUERY PARAMETERS (/operacion?n1=x&n2=y) ---
app.get('/query/sumar', (req, res) => {
    const resultado = parseFloat(req.query.n1) + parseFloat(req.query.n2);
    res.json({ metodo: "Query", operacion: "suma", resultado });
});
app.get('/query/restar', (req, res) => {
    const resultado = parseFloat(req.query.n1) - parseFloat(req.query.n2);
    res.json({ metodo: "Query", operacion: "resta", resultado });
});
app.get('/query/multiplicar', (req, res) => {
    const resultado = parseFloat(req.query.n1) * parseFloat(req.query.n2);
    res.json({ metodo: "Query", operacion: "multiplicación", resultado });
});
app.get('/query/dividir', (req, res) => {
    const resultado = parseFloat(req.query.n1) / parseFloat(req.query.n2);
    res.json({ metodo: "Query", operacion: "división", resultado });
});

// --- 3. BLOQUE BODY PARAMS (POST /operacion) ---
app.post('/body/sumar', (req, res) => {
    const resultado = parseFloat(req.body.n1) + parseFloat(req.body.n2);
    res.json({ metodo: "Body", operacion: "suma", resultado });
});
app.post('/body/restar', (req, res) => {
    const resultado = parseFloat(req.body.n1) - parseFloat(req.body.n2);
    res.json({ metodo: "Body", operacion: "resta", resultado });
});
app.post('/body/multiplicar', (req, res) => {
    const resultado = parseFloat(req.body.n1) * parseFloat(req.body.n2);
    res.json({ metodo: "Body", operacion: "multiplicación", resultado });
});
app.post('/body/dividir', (req, res) => {
    const resultado = parseFloat(req.body.n1) / parseFloat(req.body.n2);
    res.json({ metodo: "Body", operacion: "división", resultado });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
