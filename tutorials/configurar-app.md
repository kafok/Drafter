# Configuración del entorno
Esta página muestra cuál es la configuración general que debe tener el entorno que elgijas para desarrollar el back-end, sea cual sea tu IDE. Para ello solo tenemos que configurar algunas variables de entorno, las cuales serán necesarias en distintas situaciones:

## Ejecutar aplicación
Para ejecutar la aplicación deben definirse:

> **Nota:** La variable **AUTO** para el populate debe valer **create**.

### MySQL
* **AUTO:** validate
* **DATABASE:** jdbc:mysql://127.0.0.1:3306/dev_db?user=root&password=1234
* **DATABASE_USER:** root
* **DATABASE_PASS:** 1234
* **DIALECT:** org.hibernate.dialect.MySQL5Dialect

### PostGreSQL
* **AUTO:** validate
* **DATABASE:** jdbc:postgres://root:1234@127.0.0.1:5432/dev_db
* **DATABASE_USER:** root
* **DATABASE_PASS:** 1234
* **DIALECT:** org.hibernate.dialect.PostgreSQLDialect

## Maven
Para el script de maven ha sido necesario definirlo de manera parametrizado para el script de Travis CI, por tanto, es necesario definir las siguientes variables de entorno, aunque su valor es indiferente. Aqui solo se muestran valores de ejemplo, usar otros valores solo cambiará el nombre del `.jar` que se genere con maven:
* **APP_NAME:** drafter
* **APP_VERSION:** 1.0