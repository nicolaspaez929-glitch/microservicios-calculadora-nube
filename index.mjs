import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. La lógica matemática (Soporta las 4 operaciones)
const calcular = (n1, n2, op) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    switch (op) {
        case 'sumar': return num1 + num2;
        case 'restar': return num1 - num2;
        case 'multiplicar': return num1 * num2;
        case 'dividir': return num2 !== 0 ? num1 / num2 : 'Error: Div/0';
        default: return 'Operación no válida';
    }
};

// 2. Ruta QUERY (Corregida con etiquetas para evitar el undefined)
app.get('/query', (req, res) => {
    const { n1, n2, op } = req.query;
    const resultado = calcular(n1, n2, op);
    res.json({ metodo: 'Query', operacion: op, resultado: resultado });
});

// 3. Ruta PATH (Corregida con etiquetas)
app.get('/path/:op/:n1/:n2', (req, res) => {
    const { op, n1, n2 } = req.params;
    const resultado = calcular(n1, n2, op);
    res.json({ metodo: 'Path', operacion: op, resultado: resultado });
});

// 4. Ruta BODY (Corregida con etiquetas)
app.post('/body', (req, res) => {
    const { n1, n2, op } = req.body;
    const resultado = calcular(n1, n2, op);
    res.json({ metodo: 'Body', operacion: op, resultado: resultado });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
