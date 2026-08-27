# -*- coding: utf-8 -*-
"""
خادم محلي يدعم Range requests — ضروري للفيديو.

  python serve.py          ثم افتح  http://localhost:5173

لماذا لا نستخدم `python -m http.server`؟
لأنه لا يدعم طلبات Range، فلا يستطيع المتصفح القفز داخل الفيديو ولا
تحميل جزء منه، وقد يرفض التشغيل أصلاً. هذا الخادم يدعمها.
كما يضيف ترويسات CORS اللازمة لتحميل الخطوط المحلية.
"""
import os
import re
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173


class RangeHandler(SimpleHTTPRequestHandler):

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store')
        SimpleHTTPRequestHandler.end_headers(self)

    def send_head(self):
        rng = self.headers.get('Range')
        if not rng:
            return SimpleHTTPRequestHandler.send_head(self)

        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return SimpleHTTPRequestHandler.send_head(self)

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, 'File not found')
            return None

        size = os.fstat(f.fileno()).st_size
        m = re.match(r'bytes=(\d*)-(\d*)', rng.strip())
        if not m:
            f.close()
            self.send_error(400, 'Bad Range')
            return None

        s, e = m.group(1), m.group(2)
        if s == '':                      # bytes=-N  → آخر N بايت
            length = int(e or 0)
            start = max(0, size - length)
            end = size - 1
        else:
            start = int(s)
            end = int(e) if e else size - 1

        if start >= size or start > end:
            f.close()
            self.send_response(416)
            self.send_header('Content-Range', 'bytes */%d' % size)
            self.end_headers()
            return None

        end = min(end, size - 1)
        f.seek(start)

        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', 'bytes %d-%d/%d' % (start, end, size))
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()

        self._range = (start, end)
        return f

    def copyfile(self, source, outputfile):
        rng = getattr(self, '_range', None)
        if rng is None:
            return SimpleHTTPRequestHandler.copyfile(self, source, outputfile)
        start, end = rng
        self._range = None
        remaining = end - start + 1
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            try:
                outputfile.write(chunk)
            except (BrokenPipeError, ConnectionResetError):
                return          # المتصفح ألغى الطلب — طبيعي مع الفيديو
            remaining -= len(chunk)

    def log_message(self, fmt, *args):
        pass                     # سجلّ صامت


RangeHandler.extensions_map.update({
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
    '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
})

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    srv = ThreadingHTTPServer(('127.0.0.1', PORT), RangeHandler)
    print('http://localhost:%d   (Ctrl+C للإيقاف)' % PORT)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print('\nتوقف الخادم.')
