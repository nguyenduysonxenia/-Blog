import Post from './models/post'
function serverSocket(io: any) {
  io.on('connection',function(socket: any){
    console.log('co người kết nối')
      socket.on('send-comment',function(data: any){{
        Post.findById(data.postId)
        .then((post: any)=>{
          socket.broadcast.emit('server-send-notification',{post,authorComment: data.authorComment})
        })
        .catch((err: any) => {
          console.log(err)
        })
      }}) 
  })

}
export default serverSocket;