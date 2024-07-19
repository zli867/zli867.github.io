sudo apt-get update
sudo apt-get install -y\
        g++ \
        gcc \
        make \
        ssh \
        vim \
        dialog \
        less \
        python3 \
        python3-dev \
        python3-pip \
        libpng-dev \
        libfreetype6-dev \
        libnetcdf-dev \
        libproj-dev \
        python3-numpy \
        libgdal-dev \
        nco \
        python3-gdal \
        libxml2-dev \
        libxslt1-dev \
        gdal-bin \
        mpich \
        libmpich-dev \
        libmpich12 

sudo apt-get install git 

git clone https://github.com/pnwairfire/bluesky.git pnwairfire-bluesky 

cd pnwairfire-bluesky 

pip3 install --no-binary gdal -r requirements.txt 

pip3 install -r requirements-test.txt 

pip3 install -r requirements-dev.txt 

 

cd ./bin 

export PATH="$PWD:$PATH" 

 

# For better visualization on VirtualBox recommend the third answer in:  

# https://askubuntu.com/questions/314685/is-there-a-way-to-make-a-fullscreen-on-virtualbox 