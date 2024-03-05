import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'

//el gateway es como el controlador para los websockets
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
   

    @WebSocketServer()
    server: Server;

    //metodo para conexion
    handleConnection(client: Socket) {
        console.log('client connected')       
    }

    handleDisconnect(client: Socket) {
        console.log('client disconnect')
    }


    //metodo para enviar mensajes
    @SubscribeMessage('mensaje-api') //un nombre para el metodo
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        //message body va hacer referencia a la data que enviamos

        //emitimos un mensaje para que el cliente lo vea
        console.log(data)
        //mensaje-server va hacer el evento y data va hacer el mensaje que hemos enviado hacia los clientes
        this.server.emit('mensaje-server', data)
        //el emit se envia a si mismo el msj como hacia al resto
        //el metodo broadcast envia al resto pero para nosotros mismo no
        client.broadcast.emit('mensaje-server', data)


    }

}