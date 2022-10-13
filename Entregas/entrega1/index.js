class usuario {
    constructor(nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
    }
    
    getFullName(){
        return console.log(
            `El nombre del usuario es ${this.nombre} ${this.apellido}`
        )
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return console.log(this.mascotas.length)
    }

    addBook(libro, autor){
        this.libros.push({libro: libro, autor:autor});
    }

    getBooks(){
        let arrayLibro=[];
        for (let i=0;i<this.libros.length;i++){
            arrayLibro.push(this.libros[i].libro);
        }
        return arrayLibro;
    }

}

const Agustin = new usuario ("Agustin" , "Sebastian" , [{libro: "el corazon delator" , autor: "Edgar Allan Poe"}] , ["Gato","Perro"] );

Agustin.getFullName();
console.log(`Mascota = ${Agustin.mascotas}`)

console.log(Agustin)

Agustin.countMascotas()

Agustin.addMascota("Pájaro");

console.log(Agustin)

Agustin.addBook("Spider man", "Stan Lee");


console.log(Agustin.getBooks())

console.log(Agustin)
