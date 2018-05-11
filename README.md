Requirements: <br/>
A recent version of node<br/>
Webpack installed (npm install -g webpack webpack-dev-server)<br/>
Composer installed<br/>
PHP needs to be version 7.2 or over. Install via ```curl -s http://php-osx.liip.ch/install.sh | bash -s 7.2``` and then run ```export PATH=/usr/local/php5/bin:$PATH``` if on Mac<br/>
<br/>
To install:<br/>
git clone https://github.com/xvanessah/theiconic<br/>
cd theiconic<br/>
./composer.phar install<br/>
npm install (or yarn install if you use yarn)<br/>
<br/>
In one terminal window run ```npm run webpack-serverside```<br/>
In another terminal window run ```npm run webpack-dev```<br/>
In another terminal window run ``` ./bin/console server:start```<br/>
