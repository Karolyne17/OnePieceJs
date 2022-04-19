export class Personnage {
    _id;
    _image;
    _nom;
    _prenom;
    _alias;
    _age;
    _fruit;

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }

    get nom() {
        return this._nom;
    }
    set nom(nom) {
        this._nom = nom;
    }

    get prenom() {
        return this._prenom;
    }
    set prenom(prenom) {
        this._prenom = prenom;
    }

    get alias() {
        return this._alias;
    }
    set alias(alias) {
        this._alias = alias;
    }

    get age() {
        return this._age;
    }
    set age(age) {
        this._age = age;
    }

    get fruit() {
        return this._fruit;
    }
    set fruit(fruit) {
        this._fruit = fruit;
    }

    constructor(json) {
        this.id = json.id;
        this.image = json.image;
        this.nom = json.nom;
        this.prenom = json.prenom;
        this.alias = json.alias;
        this.age = json.age;
        this.fruit = json.fruit;
    }

    toJSON() {
        return {
            id: this.id,
            image: this.image,
            nom: this.nom,
            prenom: this.prenom,
            alias: this.alias,
            age: this.age,
            fruit: this.fruit,
        }
    }
}