---
sidebar_position: 7
---

# Scripts BBDD

Los scripts que se encuentran en la carpeta `/scripts` contienen comandos para inicializar y manipular los datos de nuestra *base de datos*. Estos archivos son útiles para tener la información base para nuestro primer despliegue o incluso para crear tests de integración con información real. Hay que mencionar que primero hay que tener [mongo](https://docs.mongodb.com/manual/installation/) instalado en nuestra máquina, vamos ahora a describir por encima cada uno:

* **generatepass.sh**: Genera un documento usuario con un *mail* y una contraseña hasheada con bcrypt tal y como está configurado en el *backend*.
  
```bash title="generatepass.sh"
PASSWORD=$(htpasswd -bnBC 10 "" ${2} | tr -d ':\n' | sed 's/$2y/$2b/')

cat << EOF > mockUsername.json
[
    {
        "email": "${1}",
        "password": "${PASSWORD}",
        "tokens": []
    }
]
EOF
```

* **mongodelete.sh**: Elimina la base de datos llamada `portfolio_db` donde se conecta nuestro *backend*.

```bash title="mongodelete.sh"
mongosh portfolio_db --eval "db.dropDatabase();"
```

* **mongoexport.sh**: Exporta los datos que tenemos actualmente en nuestra base de datos a la carpeta `/exports`.

```bash title="mongoexport.sh"
cd ..
rm -r ./exports
mkdir ./exports
cd exports

mongoexport --db portfolio_db --collection users --out mockUsername.json
mongoexport --db portfolio_db --collection profile --out mockProfile.json
mongoexport --db portfolio_db --collection projects --out mockProjects.json
```

* **mongoimport.sh**: Importa los datos que se encuentran en los ficheros `mockProfile.json`, `mockUsername.json` y `mockProjects.json` a nuestra base de datos.

```bash title="mongoimport.sh"
mongoimport --jsonArray --db portfolio_db --collection users --file mockUsername.json
mongoimport --jsonArray --db portfolio_db --collection profile --file mockProfile.json
mongoimport --jsonArray --db portfolio_db --collection projects --file mockProjects.json
```

* **mongoimportatlass.sh**: Importa los datos que se encuentran en los ficheros `mockProfile.json`, `mockUsername.json` y `mockProjects.json` a nuestra base de datos en **atlass**.

```bash title="mongoimportatlass.sh"
mongoimport --jsonArray --db portfolio_db --collection users --file mockUsername.json --uri ${1}
mongoimport --jsonArray --db portfolio_db --collection profile --file mockProfile.json --uri ${1}
mongoimport --jsonArray --db portfolio_db --collection projects --file mockProjects.json --uri ${1}
```

* **mongostart.sh**: Inicializa la base de datos en *macOS* o en *linux*.

```bash title="mongostart.sh"
RED='\033[0;31m'
NC='\033[0m'
echo ""
echo "${RED} ******************************************************************************************************************"
echo "${RED} If not installed, you must install MongoDB first, instructions here: https://docs.mongodb.com/manual/installation/"
echo "${RED} ******************************************************************************************************************"
echo "${NC}"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo service mongod start
    echo "MondoDB running...."
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mongodb-community
    echo "MondoDB running...."
else
    echo "Error detecting OS, MongoDB Not Started"
fi
```
