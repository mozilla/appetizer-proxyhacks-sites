def rewriter(req, resp):
    resp.body += '''
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script src="/appetizer.js"></script>
    <!-- <script src="http://stage.myapps.mozillalabs.com/jsapi/include.js"></script> -->
    <script src="http://localserver/jsapi/include.js"></script>
    <link rel="stylesheet" type="text/css" href="/appetizer.css" />
    '''
    return resp
