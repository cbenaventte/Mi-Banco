const { Pool } = require("pg");
const Cursor = require("pg-cursor");

//aqui obtenemos los argumentos por la linea de comandos
const args = process.argv.slice(2)
let argsInicial = args[0]
let cuenta1 = args[1]
let cuenta2 = args[2]
let monto = args[3]


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "Banco",
    port: 5432,
});

if (argsInicial == 'Nuevatransaccion') {
    pool.connect(async (error_conexion, client, release) => {

        try {
            await client.query("BEGIN");

            const descontar =
                `UPDATE cuentas SET saldo = saldo - ${monto} WHERE id = ${cuenta1} RETURNING *`;
            const descuento = await client.query(descontar);

            const acreditar =
                `UPDATE cuentas SET saldo = saldo + ${monto} WHERE id = ${cuenta2} RETURNING *`;
            const acreditacion = await client.query(acreditar);

            const event = new Date();//obtenemos la fecha del dia de hoy
            const transaccion =
                `INSERT INTO transacciones (descripcion, fecha, monto, cuenta) VALUES('Transacción','${event.toLocaleDateString()}',${monto},${cuenta1}) RETURNING *`;
            const transacciones = await client.query(transaccion)

            console.log("Descuento realizado con éxito: ", descuento.rows[0]);
            console.log("Acreditación realizada con éxito: ", acreditacion.rows[0]);
            console.log("Transaccion realizada con éxito", transacciones.rows[0]);
            await client.query("COMMIT");

        } catch (e) {
            await client.query("ROLLBACK");
            console.log("Error código: " + e.code);
            console.log("Detalle del error: " + e.detail);
            console.log("Tabla originaria del error: " + e.table);
            console.log("Restricción violada en el campo: " + e.constraint);
        }
        release();
        pool.end();
    });
}

// función asíncrona que consulta la tabla de transacciones.
if (argsInicial == 'Consultatrans') {
    //const pool = new Pool(config);
    pool.connect((error_conexion, client, release) => {
        if (error_conexion) {
            console.log(error_conexion);
        } else {
            const consulta = new Cursor(`SELECT * FROM transacciones WHERE cuenta= ${cuenta1}`);
            const cursor = client.query(consulta);
            cursor.read(10, (err, rows) => {
                console.log(rows);
                cursor.close();
                release();
                pool.end();
            });
        }
    });

}

// función asíncrona que consulta el saldo de una cuenta.

if (argsInicial == 'Consultasaldo') {
    //const pool = new Pool(config);
    pool.connect((error_conexion, client, release) => {

        if (error_conexion) {
            console.log(error_conexion);
        } else {
            const consulta = new Cursor(`SELECT * FROM cuentas WHERE id= ${cuenta1}`);
            const cursor = client.query(consulta);
            cursor.read(1, (err, rows) => {
                console.log(`Saldo cuenta ${rows[0].id} es: ${rows[0].saldo}`);
                cursor.close();
                release();
                pool.end();
            });
        }
    });
}