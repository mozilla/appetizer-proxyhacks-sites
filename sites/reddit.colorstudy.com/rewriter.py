from proxyhack.rewriting import add_head


def rewriter(req, resp):
    resp.body += '''
    <script src="/appetizer.js"></script>
    <script src="http://stage.myapps.mozillalabs.com/jsapi/include.js"></script>
    <link rel="stylesheet" type="text/css" href="/appetizer.css" />
    '''
    return resp
