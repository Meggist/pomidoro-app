const faker = require('faker')
import {listController} from "../app";

class ImageModel {
    constructor() {
        this.images = []
        this.createImages()
    }

    createImages = () => {
        this.images = listController.model.containers.map((item, index) =>{
            return {
                src: faker.image.avatar(),
                id: index
            }
        })
    }

}

export default ImageModel