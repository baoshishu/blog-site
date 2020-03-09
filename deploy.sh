host=vipkit.com
/usr/local/bin/rsync -arqO public/* $host:/var/www/blog-site/ --chown=`whoami`:www-data --chmod=D2775,F774
