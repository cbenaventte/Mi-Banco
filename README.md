# Mi-Banco

Descripción
La empresa Mi Banco SPA está recién registrada y está en búsqueda de un desarrollador full
stack developer que empiece a crear su sistema de transacciones. Previamente los dueños
de esta empresa habían intentado crear una institución bancaria pero el software que
compraron tenía vulnerabilidades y permitía hacer transacciones sin restricciones, por lo
que están exigiendo de extrema necesidad controlar efectivamente los movimientos
bancarios para no generar balances negativos y consecuencia con sus clientes.
En este desafío deberás realizar una aplicación Node que se conecte con PostgreSQL,
utilice transacciones y cursores para simular el comportamiento de una transacción
bancaria.
Para la solución de este desafío, necesitarás:
● Crear una base de datos llamada banco.
● Crear una tabla transacciones
● Crear una tabla cuentas
● Registrar por lo menos 1 cuenta en la tabla cuentas con un saldo inicial

Utiliza los argumentos de la línea de comando para definir los valores que usarán tus
consultas SQL.

Requerimientos
1. Crear una función asíncrona que registre una nueva transacción utilizando valores
ingresados como argumentos en la línea de comando. Debe mostrar por consola la
última transacción realizada.
2. Realizar una función asíncrona que consulte la tabla de transacciones y retorne
máximo 10 registros de una cuenta en específico. Debes usar cursores para esto.
3. Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
ejecutada con valores ingresados como argumentos en la línea de comando. Debes
usar cursores para esto.
4. En caso de haber un error en la transacción, se debe retornar el error por consola.
