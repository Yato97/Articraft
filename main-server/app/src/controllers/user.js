var amqp = require('amqplib');
var amqpc = require('amqplib/callback_api');

// Create endpoint /api/users for POST
exports.postUser = function (req, res) {

    var jsonData = {
        username: req.body.username,
        password: req.body.password
    };

    // Send user data to rabbitmq-server
    console.log("Ask to register user: " + jsonData.username);


    amqp.connect('amqp://rabbitmq-server').then(function (conn) {
        return conn.createChannel().then(function (ch) {
            var q = 'RegisterUser';
            var msg = JSON.stringify(jsonData);

            var ok = ch.assertQueue(q, { durable: false });

            return ok.then(function (_qok) {
                // NB: `sentToQueue` and `publish` both return a boolean
                // indicating whether it's OK to send again straight away, or
                // (when `false`) that you should wait for the event `'drain'`
                // to fire before writing again. We're just doing the one write,
                // so we'll ignore it.
                ch.sendToQueue(q, Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);

                return ch.close();
            });
        }).finally(function () { conn.close(); });
    }).catch(console.warn);

    amqpc.connect('amqp://rabbitmq-server', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        // Listen for response
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'RegisterUserStatus';
            channel.assertQueue(queue, {
                durable: false
            }); //wait for queue

            channel.consume(queue, function (msg) {
                var status = JSON.parse(msg.content.toString());
                console.log(status);
                channel.close();
                connection.close();   
            }, { noAck: true });
        });
    });

    res.redirect('/');
};
