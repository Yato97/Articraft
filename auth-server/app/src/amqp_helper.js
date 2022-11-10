const amqp = require('amqplib');

exports.sendMessage = function (conn, q, msg){
        return conn.createChannel().then(function(ch) {
            var ok = ch.assertQueue(q, {durable: false});
            return ok.then(function(_qok) {
                ch.sendToQueue(q, Buffer.from(msg));
                return ch.close();
            });
    });
}
