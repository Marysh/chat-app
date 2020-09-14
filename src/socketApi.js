import openSocket from 'socket.io-client';

class SocketAPIClass {
    initConnection(chat, onReceive) {
        this.socket = openSocket('http://localhost:3000');
        this.socket.on('incomingMessage', onReceive);
        this.chat = chat;
        this.socket.emit('connectToRoom', chat.id);
    }

    disconnect() {
        this.socket.emit('disconnectFromRoom', this.chat.id);
        this.socket.disconnect();
        this.socket = null;
        this.chat = null;
    }

    sendMessage(msg, chatId, authorId, time) {
        if (this.socket) {
            this.socket.emit('newMessage', {text: msg, userId: authorId, chatId: chatId, time: time});
        }
    }
}


const SocketAPI = new SocketAPIClass();

export default SocketAPI;
