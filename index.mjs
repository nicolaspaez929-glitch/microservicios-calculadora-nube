import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Función auxiliar para calcular (Evita repetir código)
const calcular = (n1, n2, op) => {
    const num1 = Number(n1);
    const num2 = Number(n2);
    
    switch (op) {
        case 'sumar': return num1 + num2;
        case 'restar': return num1 - num2;
        case 'multiplicar': return num1 * num2;
        case 'dividir': return num2 !== 0 ? num1 / num2 : 'Error: Div entre 0';
        default: return 'Operación no válida';
    }
};

// 1. MÉTODO QUERY PARAMS
// Ejemplo: /query?n1=10&n2=5&op=sumar
app.get('/query', (req, res) => {
    const { n1, n2, op } = req.query;
    const resultado = calcular(n1, n2, op);
    res.json({ metodo: 'Query', operacion: op, resultado });
});

// 2. MÉTODO PATH PARAMS
// Ejemplo: /path/sumar/10/5
app.get('/path/:op/:n1/:n2', (req, res) => {
    const { op, n1, n2 } = req.params;
    const resultado = calcular(n1, n2, op);
    res.json({ metodo: 'Path', operacion: op, resultado });
});

// 3. MÉTODO BODY PARAMS
// Ejemplo POST con JSON: { "n1": 10, "n2": 5, "op": "sumar" }
app.post('/body', (req, res) => {
    const { n1, n2, op } = req.body;
    const resultado = calcular(n1, n2, op);
    res.json({ metodo: 'Body', operacion: op, resultado });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor multicalculadora corriendo en puerto ${PORT}`);
});
