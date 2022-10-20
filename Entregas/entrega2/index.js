const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this._filename = fileName;
        this._readFileOrCreateNewOne();
    }

    async _readFileOrCreateNewOne() {
        try {
            await fs.promises.readFile(this._filename, "utf-8");
        } catch (error) {
            error.code === "ENOENT"
                ? this._createEmptyFile()
                : console.log(
                    `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
                );
        }
    }

    async _createEmptyFile() {
        fs.promises.writeFile(this._filename, "[]", (error) => {
            error
                ? console.log(error)
                : console.log(`File ${this._filename} was created since it didn't exist in the system`);
        });
    }

    async getById(id) {
        try {
            const data = await this.getData();
            const parsedData = JSON.parse(data);

            return parsedData.find((producto) => producto.id === id);
        } catch (error) {
            console.log(
                `Error Code: ${error.code} | There was an error when trying to get an element by its ID (${id})`
            );
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectIdToBeRemoved = parsedData.find(
                (producto) => producto.id === id
            );

            if (objectIdToBeRemoved) {
                const index = parsedData.indexOf(objectIdToBeRemoved);
                parsedData.splice(index, 1);
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
            } else {
                console.log(`ID ${id} does not exist in the file`);
                return null;
            }
        } catch (error) {
            console.log(
                `Error Code: ${error.code} | There was an error when trying to delete an element by its ID (${id})`
            );
        }
    }

    async save(object) {
        try {
            const allData = await this.getData();
            const parsedData = JSON.parse(allData);

            object.id = parsedData.length + 1;
            parsedData.push(object);

            await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
            return object.id;
        } catch (error) {
            console.log(
                `Error Code: ${error.code} | There was an error when trying to save an element`
            );
        }
    }

    async deleteAll() {
        try {
            await this._createEmptyFile();
        } catch (error) {
            console.log(
                `There was an error (${error.code}) when trying to delete all the objects`
            );
        }
    }

    async getData() {
        const data = await fs.promises.readFile(this._filename, "utf-8");
        return data;
    }

    async getAll() {
        const data = await this.getData();
        return JSON.parse(data);
    }
}

const contenedor = new Contenedor("productos.json");

const main = async () => {
    const id1 = await contenedor.save({ title: "Regla", price: 75.66 });
    const id2 = await contenedor.save({ title: "Goma", price: 57.75 });
    const id3 = await contenedor.save({ title: "Lapicera", price: 100 });

    console.log(id1, id2, id3); // 1, 2, 3

    const object2 = await contenedor.getById(2);
    console.log(object2); // { title: 'Goma', price: 57.75, id: 2 }

    await contenedor.deleteById(2);

    const allCurrentObjects = await contenedor.getAll();
    console.log(allCurrentObjects);
    /**
     * [
        { title: 'Regla', price: 75.66, id: 1 },
        { title: 'Lapicera', price: 100, id: 3 }
        ]
    */

    //await contenedor.deleteAll();
};

main(); 