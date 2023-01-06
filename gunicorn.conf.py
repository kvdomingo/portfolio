wsgi_app = "kvdomingo.wsgi"

worker_class = "gevent"
workers = 2
timeout = 30
graceful_timeout = 5
keepalive = 65

errorlog = "-"
accesslog = "-"
access_log_format = "%(t)s %(r)s %(s)s %(M)sms"
capture_output = True
loglevel = "debug"
