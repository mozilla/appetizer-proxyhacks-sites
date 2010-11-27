from pyquery import PyQuery as pq
from lxml import html
import random
import re

digits = re.compile(r'^\s*\d+\s*$')

def rewriter(req, resp):
    if 'html' not in resp.content_type:
        return resp
    resp.decode_content()
    doc = html.fromstring(resp.body)
    words = []
    for el in doc.body.iterdescendants():
        if el.tag in ('script', 'style'):
            continue
        add_words(words, el.text)
        add_words(words, el.tail)
    random.shuffle(words)
    words = words + words
    for el in doc.body.iterdescendants():
        if el.tag in ('script', 'style'):
            continue
        el.text = get_words(words, el.text)
        el.tail = get_words(words, el.text)
    resp.body = html.tostring(doc)
    resp.status = '200 Rewritten'
    return resp

def add_words(words, text):
    if text and text.strip() and not digits.match(text):
        words.extend(text.strip().split())

def get_words(words, text):
    if not text or not text.strip() or digits.match(text):
        return text
    c = len(text.strip().split())
    return ' '.join(words.pop() for i in range(c))

