npm run build
git add .

read message
echo "Commit Message: "
git commit -m "$message"
git push
ssh api.mattheussilva.com
  # 'git -C /home/matheus/apirestJS ' \
  # 'git pull && ' \
  # 'pm2 restart Api && sudo service nginx restart'
