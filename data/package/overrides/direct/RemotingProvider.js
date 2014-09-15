Ext.define('Override.direct.RemotingProvider', {
    override : 'Ext.direct.RemotingProvider',

    parseResponse : function(response) {
        if (!Ext.isEmpty(response.responseText)) {
            //overridden to add Ext.isArray
            if (Ext.isObject(response.responseText) || Ext.isArray(response.responseText)) {
                return response.responseText;
            }

            return Ext.decode(response.responseText);
        }

        return null;
    },

    sendRequest : function(transaction) {
        var me   = this,
            done = function(transaction, response) {
                me.onData({
                    transaction : transaction
                }, true, {
                    responseText : response
                });
            },
            delay, config;

        if (Ext.isArray(transaction)) {
            me.sendTransactions(transaction, done);
        } else {
            config = MockData.Manager.getDirect(transaction);

            if (config) {
                delay = config.delay;

                if (delay) {
                    me.sendTransactionDelay(delay, transaction, config, done);
                } else {
                    me.doSendTransaction(transaction, config, done);
                }
            }
        }
    },

    sendFormRequest : function(transaction) {
        this.sendRequest(transaction);
    },

    sendTransaction : function(transaction, config) {
        var action      = transaction.getAction ? transaction.getAction() : transaction.action,
            transMethod = transaction.getMethod ? transaction.getMethod() : transaction.method,
            method, args;

        if (config) {
            method = config.fn;

            if (method) {
                console.info('Direct Mock Data', action, transMethod);

                if (transaction.form) {
                    args = Ext.Object.fromQueryString(
                        Ext.dom.Element.serializeForm(transaction.form)
                    );
                } else {
                    args = transaction.data;
                }

                return {
                    type   : 'rpc',
                    tid    : transaction.tid,
                    action : action,
                    method : transMethod,
                    result : method.fn.call(config.scope, args, transaction)
                };
            } else {
                console.warn('The method:', transMethod, 'Was not found for the action:', action);
            }
        } else {
            console.warn('The action was not found:', transMethod);
        }
    },

    sendTransactions : function(transactions, done) {
        var order     = [],
            responses = {},
            check     = function() {
                var tid;

                for (tid in responses) {
                    if (!responses[tid]) {
                        return false;
                    }
                }

                finish();

                return true;
            },
            finish   = function() {
                var i        = 0,
                    length   = order.length,
                    response = [];

                for (; i < length; i++) {
                    response.push(responses[order[i]]);
                }

                done(transactions, response);
            },
            callback = function(transaction, response) {
                responses[transaction.tid] = response;

                check();
            },
            trans, config, delay;

        while (trans = transactions.pop()) {
            responses[trans.tid] = null;

            order.push(trans.tid);

            config = MockData.Manager.getDirect(trans);
            delay  = config.delay;

            if (delay) {
                this.sendTransactionDelay(delay, trans, config, callback);
            } else {
                this.doSendTransaction(trans, config, callback);
            }
        }
    },

    sendTransactionDelay : function(delay, transaction, config, done) {
        var me = this;

        setTimeout(function() {
            me.doSendTransaction(transaction, config, done);
        }, delay);
    },

    doSendTransaction : function(transaction, config, done) {
        var response = this.sendTransaction(transaction, config);

        Ext.Array.remove(this.callBuffer, transaction);

        done(transaction, response);
    },

    combineAndSend : function() {
        var me     = this,
            buffer = me.callBuffer,
            len    = buffer.length;

        if (len > 0) {
            me.sendRequest(len == 1 ? buffer[0] : buffer);
            //do not clear the callBuffer
        }
    }
});
