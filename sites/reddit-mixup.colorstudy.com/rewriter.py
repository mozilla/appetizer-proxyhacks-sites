from pyquery import PyQuery as pq
from lxml import html
import random
import re

word_re = re.compile(r'[a-z][a-z][a-z]+', re.I)

def rewriter(req, resp):
    if 'html' not in resp.content_type:
        return resp
    resp.decode_content()
    doc = html.fromstring(resp.body)
    words = []
    els = doc.xpath('//title')
    els.extend(e for e in doc.body.iterdescendants()
               if e.tag not in ('script', 'style'))
    for el in els:
        add_words(words, el.text)
        add_words(words, el.tail)
    random.shuffle(words)
    words = words + words
    for el in els:
        el.text = get_words(words, el.text)
        el.tail = get_words(words, el.tail)
    resp.body = html.tostring(doc)
    resp.status = '200 Rewritten'
    return resp

def add_words(words, text):
    if text and text.strip():
        words.extend(m.group(0) for m in word_re.finditer(text))

def get_words(words, text):
    if not text or not text.strip():
        return text
    c = len(text.strip().split())
    text = word_re.sub(lambda m: words.pop(), text)
    return text

