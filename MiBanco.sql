--Crear una tabla transacciones.
CREATE TABLE transacciones(
	descripcion varchar(50), 
	fecha varchar(10), 
	monto DECIMAL, 
	cuenta INT);
	
--Crear una tabla cuentas.
CREATE TABLE cuentas (
	id INT, 
	saldo DECIMAL CHECK (saldo >= 0) );
	
--Registrar por lo menos 1 cuenta en la tabla cuentas con un saldo inicial.
INSERT INTO cuentas values (1, 20000);
INSERT INTO cuentas values (2, 0);

SELECT * FROM transacciones;
SELECT * FROM cuentas;
