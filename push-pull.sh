npm run build
git add .

echo "Commit Message: "
read message
git commit -m "$message"
git push
ssh matheus@34.151.247.112 \
  'cd /apirestJS ' \
  'git pull && ' \
  'pm2 restart Api && sudo service nginx restart'
