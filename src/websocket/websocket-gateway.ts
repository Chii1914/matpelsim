import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, {})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    
    handleConnection(client: any, ...args: any[]) {
        this.server.emit('user-status', {message: `Nuevo usuario conectado: ${client.id}`});
    }

    handleDisconnect(client: any) {
        this.server.emit('user-status', {message: `Usuario: ${client.id}, desconectado`});
    }

    @SubscribeMessage('parameter')
    handleNewMessage(@MessageBody() message: any){
        this.server.emit('lectures', message);
    }

}