from proxyhack.rewriting import add_head


def rewriter(req, resp):
    resp = add_head(req, resp, '''
    <script src="/appetizer.js"></script>
    ''')
    resp = add_head(req, resp, '''
    <link rel="stylesheet" type="text/css" href="/appetizer.css" />
    ''')
    return resp
