USE company;

DELIMITER $$
USE `company`$$

CREATE PROCEDURE `employeeAddOrEdit` (
  IN _id INT,
  IN _name VARCHAR(45),
  IN _salary INT
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO employee (name, salary)
    VALUES (_name, _salary);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE employee
    SET
    name = _name,
    salary = _salary
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END



USE cortessureste;

DELIMITER $$
USE `cortessureste`$$

CREATE PROCEDURE `clienteAddOrEdit` (
  IN _id_cliente INT,	
  IN _nombres VARCHAR(45),
  IN _apellidos VARCHAR(45),
  IN _direccion VARCHAR(30),
  IN _ciudad VARCHAR(50),
  IN _telefono VARCHAR(12),
  IN _email VARCHAR(45),
  IN _password LONGTEXT
)
BEGIN 
  IF _id_cliente = NULL THEN
    INSERT INTO employee (nombres, apellidos, direccion, ciudad, telefono, email, password)
    VALUES (_nombres, _apellidos, _direccion, _ciudad, _telefono, _email, _password);
  ELSE
    UPDATE employee
    SET
    nombres = _nombres,
    apellidos = _apellidos,
    direccion = _direccion,
    ciudad = _ciudad,
    telefono = _telefono
    WHERE id_cliente = _id_cliente;
  END IF;
  SELECT _id_cliente AS 'id_cliente';
END
