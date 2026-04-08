import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 8002,
    databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/order_service',
    model: {
        order:{
            status: process.env.ORDER_STATUS || ["placed", "shipped", "delivered", "cancelled", "refunded"],
            trackerURL: process.env.TRACKER_URL || 'https://trackings.post.japanpost.jp/services/srv/search/direct?searchKind=S004&locale=ja&reqCodeKind=SGNB&start=1&postNo='
        }
    }
};