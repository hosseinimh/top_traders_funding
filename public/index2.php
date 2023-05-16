<!DOCTYPE html>
<html>

<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <script src="https://unpkg.com/metaapi.cloud-sdk/index.js"></script>
</head>

<body>
    <script>
        async function testMetaApiSynchronization(token, accountId) {
            try {
                const api = new MetaApi(token);
                const account = await api.metatraderAccountApi.getAccount(accountId);

                console.log('Waiting for API server to connect to broker (may take couple of minutes)');
                await account.waitConnected();

                // connect to MetaApi API
                let connection = account.getRPCConnection();
                await connection.connect();

                // wait until terminal state synchronized to the local state
                console.log('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)');
                await connection.waitSynchronized();

                // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
                console.log('Testing MetaAPI RPC API');
                console.log('account information:', JSON.stringify(await connection.getAccountInformation()));
            } catch (err) {
                console.log(err);
            }
            return;
        }
        const token =
            "SeXvxfbQHLxMoRR9MRFndfyRT9tD9QcNiQnxpMtgwY14VeSVNUR4FtSgmZr3VrEy";
        const accountId = "fd8f34a6-258f-4e27-8e56-274a328388fb";
        testMetaApiSynchronization(token, accountId);
    </script>
</body>

</html>