class BaseDao {
    async getAll(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

export default BaseDao;