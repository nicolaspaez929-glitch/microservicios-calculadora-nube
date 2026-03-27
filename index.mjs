import express from 'express';
import cors from 'cors';

const app = express();

// Configuración necesaria para conectar con Hostinger y leer JSON
app.use(cors()); 
app.use(express.json()); 

// 1. SUMA - Usando Path Params (GET)
// Ejemplo: /sumar/10/5
app.get('/sumar/:n1/:n2', (req, res) => {
    const { n1, n2 } = req.params;
    const resultado = parseFloat(n1) + parseFloat(n2);
    res.json({ 
        operacion: 'suma (path params)', 
        resultado: resultado 
    });
});

// 2. RESTA - Usando Query Params (GET)
// Ejemplo: /restar?n1=20&n2=8
app.get('/restar', (req, res) => {
    const { n1, n2 } = req.query;
    const resultado = parseFloat(n1) - parseFloat(n2);
    res.json({ 
        operacion: 'resta (query params)', 
        resultado: resultado 
    });
});

// 3. MULTIPLICAR - Usando Body Params (POST)
// Ejemplo: POST a /multiplicar con JSON {"n1": 4, "n2": 3}
app.post('/multiplicar', (req, res) => {
    const { n1, n2 } = req.body;
    const resultado = parseFloat(n1) * parseFloat(n2);
    res.json({ 
        operacion: 'multiplicación (body params)', 
        resultado: resultado 
    });
});

// 4. DIVIDIR - Usando Body Params (POST)
// Ejemplo: POST a /dividir con JSON {"n1": 10, "n2": 2}
app.post('/dividir', (req, res) => {
    const { n1, n2 } = req.body;
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (num2 === 0) {
        return res.status(400).json({ error: "No se puede dividir por cero" });
    }
    
    const resultado = num1 / num2;
    res.json({ 
        operacion: 'división (body params)', 
        resultado: resultado 
    });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de calculadora corriendo en el puerto ${PORT}`);
});
