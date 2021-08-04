import ListModel from './list/models'
import ListView from './list/views'
import ListController from './list/controllers'
import ImageModel from "./image-block/models"
import ImageController from "./image-block/controllers"
import ImageView from "./image-block/views"
import LikeModel from "./like/models"
import LikeView from "./like/views"
import LikeController from "./like/controllers";

const listModel = new ListModel()
const listView = new ListView(listModel)
export const listController = new ListController(listModel, listView)

const imageModel = new ImageModel()
const imageView = new ImageView(imageModel)
export const imageController = new ImageController(imageModel, imageView)

const likeModel = new LikeModel()
const likeView = new LikeView(likeModel)
export const likeController = new LikeController(likeModel, likeView)


