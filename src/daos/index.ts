import MessageDao from "./message-dao";
import ProductDao from "./product-dao";

let instance:DaoFactory;
class DaoFactory {

    static getInstance():DaoFactory {
        if(!instance) {
            instance = new DaoFactory();
        }
        return instance;
    }

    createDao(dao_name:string):any {
        switch(dao_name) {
            case 'products':
                return ProductDao.getInstance();
            case 'messages':
                return MessageDao.getInstance();
            default:
                throw new Error('Dao not found');
        }
    }
}

export default DaoFactory;