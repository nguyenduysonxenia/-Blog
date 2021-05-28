import mongoose from 'mongoose';
async function connect(): Promise<void>{
  let connectionString = (<string>process.env.DB_CONNECT);
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('kết nối thành công');
    } catch (error) {
        console.log('kết nối thất bại');
    }
}

export default connect;
