###
 # @Description: 
 # @Autor: xiukun@herry
 # @Date: 2021-02-10 13:21:03
 # @LastEditors: xiukun@herry
 # @LastEditTime: 2021-02-10 13:23:14
### 
# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

#创建.nojekyll 防止Github Pages build错误
touch .nojekyll

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:xiukun/vue3-pc-elementPlus-tailwind.git master:gh-pages